import { body } from "express-validator";
import { User } from "../models/users.model.js";

const checkDuplicateEmail = async(email) => {
    const user = await User.findOne({email});
    if(user){
        err = new Error('This email is already in use!');
        throw err;
    }
}

export const validations = [
  body("fullname")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Fullname is a required field!")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Invalid pattern for Fullname!"),
  body("email")
    .trim()
    .escape()
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email address!")
    .notEmpty()
    .withMessage("Email is a required field!")
    .custom(checkDuplicateEmail).withMessage('Email is already in use!'),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is a required field!")
    .isLength({ min: 5 })
    .withMessage("Password is to short!"),
  body("role")
    .trim()
    .escape()
    .notEmpty().withMessage('Role is a required field')
    .isAlpha().withMessage('Invalid value for the Role')
];

export const loginValidations = [
  body("email")
    .isEmail()
    .withMessage("Invalid email address!")
    .notEmpty()
    .withMessage("Email is a required field!"),
  body("password")
    .notEmpty()
    .withMessage("Password is a required field!")
    .isLength({ min: 5 })
    .withMessage("Password is to short!"),
];
