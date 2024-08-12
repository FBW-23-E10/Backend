import express from "express";
import { login, register } from "../controllers/users.controller.js";
import { loginValidations, validations } from "../validations/users.validation.js";
import { handleValidationResults } from "../middlewares/users.mw.js";

const router = express.Router();

// define routes here
router.route("/register").post(validations, handleValidationResults, register);
router.route("/login").post(loginValidations,handleValidationResults, login);

export default router;
