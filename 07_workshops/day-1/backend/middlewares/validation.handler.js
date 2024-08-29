import { validationResult } from "express-validator";

export const validation_err_handler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = {};

    errors.array().forEach((error) => {
        console.log(error)
      if (!extractedErrors[error.path]) {
        extractedErrors[error.path] = error.msg;
      }
    });

    return res.status(400).json({ validation_errors: extractedErrors, status: 'bad request' });
  }
  next();
};
