import mongoose from "mongoose";

export const conToDB = async() => {
        mongoose.connect(process.env.DB_URL);
        mongoose.connection.on('connected', () => {
            console.log('DB connection established! 😄');
        });

        mongoose.connection.on('error', (err) => {
            console.error(err);
        })
}