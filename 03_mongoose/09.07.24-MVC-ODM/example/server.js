const express = require("express");
const userRouter = require('./routers/users.router');
const mongoose = require("mongoose");
const connectToDB = require("./middleware/db_connect");
const app = express();
require('dotenv').config();

// database connection
// mongoose.connect(process.env.DB_URL)
//   .then(()=> console.log('connection established! 😀'))
//   .catch((err)=>console.log(`connection Error: ${err.message}`))


// alternative: database connection using events
// mongoose.connect(process.env.DB_URL);
// mongoose.connection.on('connected', () => {
//   console.log('Connection established! 😎');
// });

// mongoose.connection.on('error', (err) => {
//   console.log(`connection error: ${err.message}😞`)
// })

//another alternative (using function)
connectToDB();


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// routers
app.use('/users', userRouter);

// error handler
app.use((req, res, next) => {
  const err = new Error("Route not defined!");
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

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server is up on port: ${port} 🚀`));
