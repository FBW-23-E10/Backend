import { check } from "express-validator";


const validations = [
    check("title")
        .trim()
        .escape()
        .notEmpty().withMessage('product title is required')
        .matches(/^[a-zA-Z\s\d]+$/).withMessage('invalid product title!')
        .isLength({min: 3, max:255}).withMessage('invalid product title length'),

    check("price")
        .trim()
        .escape()
        .notEmpty().withMessage('price is a required field')
        .isNumeric().withMessage('price should be number only')
]

export default validations;