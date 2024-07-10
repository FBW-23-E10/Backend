import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import recordRouter from './routes/recordRouter.js';
const app = express();

dotenv.config();
const { PORT, DB_URI } = process.env;
console.log(PORT, DB_URI);

app.use(express.json());
app.use(cors());

app.use('/records', recordRouter);

// error handler
app.use((req, res, next) => {
  const err = new Error('Route not defined!');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (err) {
    err.status ||= 500;
    res.status(err.status).json({
      status: err.status,
      message: err.message,
    });
    next();
  }
});

app.listen(PORT, () => console.log(`server running on ${PORT}`));

mongoose.connect(DB_URI);
mongoose.connection
  .on('error', console.error)
  .on('open', () =>
    console.log(`Conntected to MongoDB / ${mongoose.connection.name}`)
  );
