//const express = require('express')
import express from 'express';
import cors from 'cors';
import {data} from './data.js'
const app = express();

app.use(cors());

const PORT = process.env.PORT || '3000';
// respond with "hello world" when a GET request is made to the homepage
app.get('/hello', (req, res) => {
  res.send('hello world');
});

/* console.log(process);
process.exit(); */

app.get('/', (req, res) => {
  res.send(' this is the home page');
});
app.get('/records', (req, res) => {
  res.send(data);
});
app.get('/port', (req, res) => {
  res.send(PORT);
});

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
