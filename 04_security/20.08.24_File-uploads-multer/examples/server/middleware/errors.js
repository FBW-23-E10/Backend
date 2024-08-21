export const errorHandler = (err, req, res, next) => {
  res.send({ message: err.message });
};
