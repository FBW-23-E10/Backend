import {body } from 'express-validator';

export const register_validator = [
    body('fullname')
        .trim()
        .escape()
        .notEmpty().withMessage('fullname is a required field')
        .matches(/^[a-zA-Z\s\d]+$/).withMessage('invalid fullname value')
        .isLength({min: 3, max:100}).withMessage('fullname length is not valid'),

    body('email')
        .trim()
        .escape()
        .notEmpty().withMessage('email is a required field')
        .isEmail().withMessage('invalid email address'),

    body('password')
        .trim()
        .escape()
        .notEmpty().withMessage('password is a required field')
        .isLength({ min: 5}).withMessage('Password is too short'),

    body('role')
        .trim()
        .escape()
        .notEmpty().withMessage('Role is a required field')
        .isAlpha().withMessage('Invalid value for the role')   
]



export const login_validator = [
    body('email')
        .trim()
        .escape()
        .notEmpty().withMessage('email is required')
        .isEmail().withMessage('invalid email address'),

    body('password')
        .trim()
        .escape()
        .notEmpty().withMessage('password is required')
        .isLength({min: 5}).withMessage('password is to short')
]