export const errorHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ message: err.message });
  } else {
    res.status(500).send({ message: err.message });
  }
};

export const notFound = (req, res, next) => {
  res.status(404).send({ message: 'Sorry, path not found' });
};
