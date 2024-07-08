const express = require("express");
const userRouter = require('./routers/users.router');
const app = express();

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
