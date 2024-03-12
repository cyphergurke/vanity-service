import mongoose from 'mongoose';

let isConnected: boolean = false;
 
export const connectToDatabase = async () => {
    mongoose.set('strictQuery', true);

    if (!process.env.MONGODB_URL) return console.log('Mising database connection')

    if (isConnected) return console.log('already connected');

    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: 'overstackingflow',
        })
        isConnected = true;
        console.log('connection successful');
    } catch (err: any) {
        console.log(err.message);
    }
}