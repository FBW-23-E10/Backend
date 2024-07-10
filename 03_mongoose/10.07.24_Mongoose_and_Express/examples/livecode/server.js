import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { recordsRouter } from './routes/recordRoutes.js';
dotenv.config();

const { DB_URI } = process.env;
const { PORT } = process.env;

const app = express();

app.use(express.json())
app.use(cors())


// Routes

app.use('/records',recordsRouter)



app.listen(PORT, () => console.log('server running on port 3000'));

mongoose.connect(DB_URI);
mongoose.connection
  .on('error', console.error)
  .on('open', () =>
    console.log(`Conntected to MongoDB / ${mongoose.connection.name}`)
  );
