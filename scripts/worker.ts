import { resolve } from 'path';
import * as dotenv from 'dotenv';
import { workerData, parentPort } from 'worker_threads';
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';

dotenv.config({ path: resolve(process.cwd(), '../.env.local') });

interface WorkerData {
  bookingId: string;
  addresstype: string;
  praefix: string;
  praefix_cs: boolean;
  publickey: string;
  processor: 'CPU' | 'GPU';
}

// Assuming workerData follows the WorkerData interface structure
const data: WorkerData = workerData ?? {
  bookingId: '123', // Default test data
  addresstype: '1',
  praefix: 'peter',
  praefix_cs: true,
  publickey: '02A85180759399E8738CE9522A92A39B2CA9CC28D5CA0955B3D37E1BAF7DF46F22',
  processor: 'CPU',
};

const path: string = process.env.CWD || "/home/cyphr/buni/vanity/VanitySearch";
const cwd: string = resolve(path);
const threads: string = process.env.THREADS || '6';
const outputDir: string = resolve(__dirname, '../', process.env.VANITY_OUTDIR ?? '');

// Prepare arguments for the VanitySearch command
const args: string[] = [
  '-stop', // stop computing after finding the first result
  '-t', threads, // use specified number of cores
  '-sp', data.publickey, // the given public key
  ...(data.praefix_cs ? [] : ['-c']), // case sensitive if not praefix_cs
  ...(data.processor === 'GPU' ? ['-gpu'] : []), // use GPU if processor is GPU
  '-o', `${outputDir}/${data.bookingId}.txt`, // output file
  `${data.addresstype}${data.praefix}`, // prefix to search for
];

const vs: ChildProcessWithoutNullStreams = spawn('./VanitySearch', args, { cwd });

// Post initial message with the arguments used
if (parentPort) {
  parentPort.postMessage({ bookingId: data.bookingId, status: 'starts', arguments: args.join(' ') });
}

vs.stdout.on('data', (data: any) => {
  const output: string = data.toString();
  // Initialize error as empty
  let error: string = '';

  // Parse VanitySearch output to extract values
  const { CPUspeed, CPUspeedUnit, GPUspeed, GPUspeedUnit, percentage, halflife } = VanityOutputToValues(output, error);

  // Send stats to parent process if no error
  if (parentPort && !error) {
    parentPort.postMessage({
      bookingId: data.bookingId,
      status: 'running',
      CPUspeed,
      CPUspeedUnit,
      GPUspeed,
      GPUspeedUnit,
      percentage,
      halflife,
    });
  }
});

vs.stderr.on('data', (data: any) => {
  if (parentPort) {
    parentPort.postMessage({ bookingId: data.bookingId, status: 'error', data: data.toString() });
  }
});

vs.on('close', (code) => {
  if (parentPort) {
    parentPort.postMessage({ bookingId: data.bookingId, status: 'exited', code, error: '' });
  }
});

function VanityOutputToValues(string: string, error: string): {
  CPUspeed?: number,
  CPUspeedUnit?: string,
  GPUspeed?: number,
  GPUspeedUnit?: string,
  percentage?: number,
  halflife?: string
} {
  if (string.includes('Error')) {
    error = string;
    return {};
  }

  // Initialize the return object
  const values: any = {};

  // Parse and assign values accordingly
  // Note: Implement the logic to parse the string and extract necessary values

  return values;
}