//const express = require('express')
import express from 'express';
import cors from 'cors';
import {data} from './data.js'
const app = express();

app.use(cors());

const PORT = process.env.PORT || '3000';





app.get('/records', (req, res) => {
  res.send(data);
});


app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
