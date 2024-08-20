import express from 'express';
import { handleVerifyLink, login, register, updateUser } from '../controllers/users.controller.js';
import {register_validator} from '../validations/user.validation.js'
import { handleValidationResult } from '../middlewares/handleValidation.js';
const router = express.Router();

router.route('/register').post(register_validator, handleValidationResult ,register);
router.route('/confirm/:token/:uid').get(handleVerifyLink);
router.route('/login').post(login);
router.route('/:uid').put(updateUser);

export default router;