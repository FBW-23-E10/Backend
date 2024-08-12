import { check, validationResult } from "express-validator";

const sanitizeInput = [
  check("firstName").trim().escape(),
  check("lastName").trim().escape(),
  check("age").trim().escape(),
  check("email").trim().escape().normalizeEmail(),
  check("password").trim().escape(),
  check("passwordConfirm").trim().escape(),

  (req, res, next) => {
    const result = validationResult(req);

    result.isEmpty()
      ? next()
      : res.send({ errors: result });
  },
];

export default sanitizeInput;