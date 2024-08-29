import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import { addUser, getUser, getUsers } from './controllers/userControllers.js';


const app = express();
dotenv.config();

app.use(cors()); 
app.use(express.json());



//ROUTES
app.get('/users', getUsers);
app.get('/users/:id', getUser);
app.post('/users/signup', addUser);







//START LISTENING ON PORT

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});

//CONNECT TO MONGO_DB

mongoose.connect(process.env.DB_URI);

mongoose.connection.on('error', console.error).on('open', () => {
  console.log('Connected to DB');
});
