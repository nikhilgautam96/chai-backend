import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';
import { log } from 'console';
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_NAME}`
        );
        log(
            `\n MongoDB Connected !! DB HOST : ${connectionInstance.connection.host}`
        );
        // log(connectionInstance.connection);
    } catch (error) {
        log('MONGODB connection FAILED', error);
        process.exit(1);
    }
};

export default connectDB;
