import mongoose from "mongoose";
import createError from "http-errors";

export const isValidId = (req) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new Error("The provided ID is not valid");
  }
};

export const authError = (statusCode, message) => {
  throw createError(statusCode, message);
};

export const routeNotFound = (req, res, next) => {
  const newError = new Error("Resource not found");
  newError.status = 404;
  next(newError);
};

export const globalErrorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    statusCode: err.statusCode,
    type:
      err.status === 500
        ? "Server Error"
        : err.stack.split(":")[0].replace(/([a-z])([A-Z])/g, "$1 $2"),
    message: err.message,
    stack: err.stack,
  });
};