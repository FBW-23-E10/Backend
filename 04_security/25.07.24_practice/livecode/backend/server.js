import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRouter.js';
import dotenv from 'dotenv'
import mongoose from 'mongoose'
const app = express();
import { errorHandler, notFound } from './middleware/errors.js';
dotenv.config()


const {PORT,DB_URI}=process.env
app.use(cors())
app.use(express.json());

app.use('/users', userRouter);

// error handler
app.use(notFound)
app.use(errorHandler)
app.listen(3000,()=>{console.log('app is listening on port 3000')})


mongoose.connect(DB_URI);
mongoose.connection
  .on('error', console.error)
  .on('open', () =>
    console.log(`Conntected to MongoDB / ${mongoose.connection.name}`)
  );
