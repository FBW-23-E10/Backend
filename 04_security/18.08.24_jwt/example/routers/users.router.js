import express from "express";
import { handleVerifyLink, login, register, sendEmail, updateUser } from "../controllers/users.controller.js";
import { loginValidations, validations } from "../validations/users.validation.js";
import { handleValidationResults } from "../middlewares/users.mw.js";

const router = express.Router();

// define routes here
router.route("/register").post(validations, handleValidationResults, register);
router.route("/login").post(loginValidations,handleValidationResults, login);
router.route("/update/:uid").put(updateUser);
router.route('/sendmail').get(sendEmail);
router.route('/confirm/:token/:uid').get(handleVerifyLink);

export default router;
