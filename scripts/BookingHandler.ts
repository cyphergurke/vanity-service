
import cron from 'node-cron';
import fs from 'fs';
import { Worker } from 'worker_threads';
import { resolve } from 'path';
import EmailHandler from './EmailHandler';
import { getOrder, getOrderById } from '@/lib/actions/order.action';
import Order from '@/lib/actions/order.model';

export class BookingHandler {
  private bookingQueue: any;
  private emailHandler: EmailHandler;
  scheduledTask: cron.ScheduledTask | undefined;
  workers: any;
  workersStates: any;
  workerCPU: null | undefined;
  bookings: any;

  constructor() {
    /*  this.bookingQueue = new Queue('bookingQueue'); */
    this.emailHandler = new EmailHandler();
    this.bookings = [];
    this.workers = [];
    this.scheduledTask = undefined;
    this.emailHandler = new EmailHandler();
  }

  async initialize(): Promise<void> {
    try {
      await this.resetBookings();
      await this.getBookings();
      await this.distribute();
      this.createCronJob();
    } catch (err: any) {
      console.error(err.message);
    }
  }

  createCronJob() {
    try {
      // cron job code...
      this.scheduledTask = cron.schedule('0,30 * * * * *', async () => {
        console.debug('cron tick');
        await this.getBookings();
        await this.distribute();
      });
    } catch (error) {
      console.error('cron job couln´t get started');
    }
  }

  async resetBookings() {
    try {
      // Update all bookings that match the criteria
      const updateResult = await Order.updateMany(
        {
          status: { $in: ['COMPUTING', 'QUEUED'] },
          paymentStatus: 'COMPLETED'
        },
        { $set: { status: 'PAID' } }
      );

      // Log the outcome: how many documents were matched and updated
      console.info(`Updated ${updateResult.matchedCount} booking(s), with ${updateResult.modifiedCount} being modified.`);

      return updateResult.modifiedCount; // Return the count of modified bookings
    } catch (err: any) {
      console.error(err.stack);
      return 0; // Return 0 or handle error appropriately
    }
  }

  async getBookings() {
    console.debug('BookingHandler.getBookings()');
    let bookingPromises = [];

    try {
        // Assuming getOrder() replaces the Booking.findAll() from the previous implementation
        const bookingsFromDB: any = await getOrder().catch((err: any) => {
            console.error(err.stack);
            throw new Error('Failed to retrieve bookings');
        });

        console.log(bookingsFromDB.order)

        // Ensuring bookingsFromDB.data is an array before proceeding
        if (!bookingsFromDB || !Array.isArray(bookingsFromDB.order)) {
            console.error(bookingsFromDB.order, 'Invalid or no data returned from getOrder');
            return; // Exit the method if no valid data is present
        }

        for (const bookingFromDB of bookingsFromDB.order) {
            let doesExist = false;
            for (let i = 0; i < this.bookings.length; i++) {
                // Adjusted from id to _id based on the provided data structure
                if (bookingFromDB._id === this.bookings[i]._id) {
                    doesExist = true;
                    break;
                }
            }

            if (!doesExist) {
                bookingFromDB.status = "QUEUED"; // Update status before saving
                this.bookings.push(bookingFromDB);

                try {
                    // Assuming bookingFromDB.save() is a placeholder for the actual save logic
                    bookingPromises.push(bookingFromDB.save());
                    console.info(`booking #${bookingFromDB._id} status changed to QUEUED`);
                } catch (err: any) {
                    console.error(err.stack);
                }
            }
        }

        await Promise.all(bookingPromises)
            .then(() => console.info('All bookings processed.'))
            .catch((err: any) => {
                console.error('An error occurred while processing bookings:', err);
                throw err; // Rethrowing the error after logging
            });
    } catch (err: any) {
        console.error('An error occurred in getBookings:', err);
        // Depending on your error handling strategy, you might want to rethrow the error, return a specific result, or simply log the error.
    }
}





  async distribute() {
    if (this.bookings.length <= 0) return;

    if (this.workers['CPU'] === undefined || this.workers['CPU'] === null) {
      try {
        let booking = this.bookings.shift();
        booking.status = 'COMPUTING';
        console.log(booking, "BOOOOOKINGGGGG!!!!!!!!!!!!!!!!!!!")
        await booking.save();
        console.info(`booking #${booking.id} status changed to COMPUTING`);
        this.workers['CPU'] = this.createWorker(
          booking._id,
          booking.addrtype,
          booking.prefixstr,
          booking.casesensitive,
          booking.publickey,
          'CPU'
        );
      } catch (err: any) {
        console.error(err.stack);
        return;
      }
    }
  }

  createWorker(bookingId: any, addresstype: any, praefix: any, praefix_cs: any, publickey: any, processor: string) {
    console.debug('createWorker()');
    let worker;
    try {
      worker = new Worker('./scripts/worker.js', {
        workerData: {
          bookingId: bookingId,
          addrtype: addresstype,
          praefix: praefix,
          praefix_cs: praefix_cs,
          publickey: publickey,
          processor: processor
        }
      });


      worker.on('error', async (err) => {
        console.error(err.stack);
        try {
          const booking = await getOrderById({ orderId: bookingId });
          booking.status = 'ERROR';
          booking.save();
          if (processor === 'CPU') {
            this.workers['CPU'] = null;
            this.workersStates['CPU'] = err;
          }
        } catch (err: any) {
          console.error(err.stack);
        }
      });

      worker.on('message', async (data) => {
        switch (data.status) {
          case 'exited':
            if (data.code !== undefined && data.code !== 0) {
              console.log(data)
              this.setBookingCalculationError(bookingId);
              console.error(`Worker for booking #${bookingId} exited because of error code ${data.code}: ${data.error}`);
            } else {
              // worker thread exited successful
              this.setBookingCalculated(bookingId);
            }
            this.workers[processor] = null;
            break;
          case 'error':
            this.setBookingCalculationError(bookingId);
            console.error(`Worker for booking #${bookingId} exited because of error: ${data.toString()}`);
            this.workers[processor] = null;
            break;
          case 'running':
          case 'starts':
            console.info(JSON.stringify(data));
            break;
          default:
            break;
        }
      });

      worker.on('exit', () => console.info(`Worker for booking #${bookingId} exited`));

      return worker;
    } catch (err: any) {
      console.log(err.stack);
    }
  }

  async setBookingCalculationError(bookingId: any) {
    try {
      const booking = await getOrderById({ orderId: bookingId });
      booking.status = 'ERROR';
      booking.save();
    } catch (err: any) {
      console.error(err.stack);
    }
  }

  async setBookingCalculated(bookingId: any) {
    this.workerCPU = null;
    try {
      const outdir = process.env.VANITY_OUTDIR ? process.env.VANITY_OUTDIR : "computed"
      const booking = await getOrderById({ orderId: bookingId });
      booking.status = 'COMPUTED';

      let bookingFile = resolve('/home/cyphr/buni/vanity/vanity-service', outdir, bookingId + '.txt');
      if (fs.existsSync(bookingFile)) {
        try {
          const data = fs.readFileSync(bookingFile, 'utf8');
          const lines = data.split(/\r?\n/);
          booking.pubAddress = lines[0].split(' ')[1];
          booking.partialPriv = lines[1].split(' ')[1];

          console.info(`bookingId #${bookingId} --> pubaddr: ${booking.pubAddress} && partialPriv: ${booking.partialPriv}`);
          
          await booking.save();
          this.emailHandler.sendPartialPriv(booking);
        } catch (err) {
          console.error(err);
        }
      } else {
        throw 'Couldn´t find file ' + bookingFile;
      }
    } catch (err: any) {
      console.error(err.stack);
    }
  }
}
