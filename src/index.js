// 2nd approach - better
// require('dotenv').config({path: './env'})
import dotenv from 'dotenv';
import connectDB from './db/index.js';
import { error, log } from 'console';
dotenv.config({
    path: './env',
});

connectDB()
    .then(() => {
        app.on('error', (error) => {
            log('ERROR :', error);
            throw error;
        });
        app.listen(process.env.PORT || 8000, () => {
            log(`Server is running at PORT : ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log('MONGO db connection failed !!! ', err);
    });

// 1st approach
/*
import express from 'express';
async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

        app.on('error', (error) => {
            log('ERRR: ', error);
            throw error;
        });
        app.listen(process.env.PORT, () => {
            log(`APP is listening on port ${process.env.PORT}`);
        });
    } catch (err) {
        error('ERROR: ', err);
        throw err;
    }
};
**/
