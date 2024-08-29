import {body} from 'express-validator';
import User from '../models/users.model.js';
import { createError } from '../utils/helpers.js';

export const register_validate_user = [
  body("fullname")
    .escape()
    .trim()
    .notEmpty().withMessage("Fullname is required!")
    .isLength({ min: 3 }).withMessage("Fullname is too short!")
    .matches(/^[a-zA-Z\s]+$/).withMessage("Fullname is not valid!"),

  body("email")
    .escape()
    .trim()
    .notEmpty().withMessage('Email is required!')
    .isEmail().withMessage('Not valid email address')
    .custom(isEmailExist),

  body("password")
    .escape()
    .trim()
    .notEmpty().withMessage('Password is required!')
    .matches(/[a-z]/).withMessage('Password should contain lower-case letters')
    .matches(/[A-Z]/).withMessage('Password should contain upper-case letters')
    .matches(/[0-9]/).withMessage('Password should contain numbers')
];

export const login_validate_user = [
  body("email")
    .escape()
    .trim()
    .notEmpty().withMessage('Email is required!')
    .isEmail().withMessage('Not valid email address')
    .custom(isEmailExist),

  body("password")
    .escape()
    .trim()
    .notEmpty().withMessage('Password is required!')
    .matches(/[a-z]/).withMessage('Password should contain lower-case letters')
    .matches(/[A-Z]/).withMessage('Password should contain upper-case letters')
    .matches(/[0-9]/).withMessage('Password should contain numbers')
];


/* is Email exist */
async function isEmailExist (email) {
    const user = await User({email});
    if(!user){
        throw createError('This email already in use!', 400)
    }
}