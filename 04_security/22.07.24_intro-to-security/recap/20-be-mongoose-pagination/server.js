import express from 'express';
import cors from 'cors';

import { connectToDB } from './libs/db.js';
import { seedDatabase } from './libs/seedDatabase.js';
import listings from './routes/listings.js';

await connectToDB();
await seedDatabase();

const port = 3001;
const app = express();

// Middleware stack
app.use(cors());
app.use(express.json());

// Middleware routes
app.use('/listings', listings);

//ERROR_HANDLER

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ message: err.message });
  } else {
    res.status(500).send({ message: err.message });
  }
});

app.use((req, res, next) => {
  res.status(404).send({ message: 'Sorry, path not found' });
});

app.listen(port, () => {
  console.log(`The server 🙈 is listening on port ${port}`);
});
