import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import userRouter from './routes/userRouter.js';
import { errorHandler, notFound } from './middleware/errors.js';

const app = express();

dotenv.config();
const { PORT, DB_URI } = process.env;
console.log(PORT, DB_URI);

app.use(express.json());
app.use(cors());


app.use('/users', userRouter);


// error handler
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => console.log(`server running on ${PORT}`));

mongoose.connect(DB_URI);
mongoose.connection
  .on('error', console.error)
  .on('open', () =>
    console.log(`Conntected to MongoDB / ${mongoose.connection.name}`)
  );
