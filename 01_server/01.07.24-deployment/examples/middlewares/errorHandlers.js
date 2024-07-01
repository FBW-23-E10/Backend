
const notFound = (req, res, next) => {
  // request with undefined route (handler)
  const err = new Error("Route is not defined!");
  err.status = 404;

  next(err);
};


const errHandler = (err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ msg: err.message });
};


module.exports = {notFound, errHandler}