import mongoose from 'mongoose';

export const con2db = () => {
    mongoose.connect(process.env.DB_URL);

    mongoose.connection.on('connected', () => {
        console.log('db connection established 🚧')
    });

    mongoose.connection.on('error', (err) => {
        console.log(err.message);
    })
}