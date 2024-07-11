import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const {DB_URI}=process.env
console.log(DB_URI)


export const connect=()=>{
    mongoose.connect(DB_URI);
    mongoose.connection
    .on('error', console.error)
    .on('open', () =>
        console.log(`Conntected to MongoDB / ${mongoose.connection.name}`)
      );
}

