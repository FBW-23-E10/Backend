import {Router} from 'express';
import { login, register } from '../controllers/users.controller.js';
import { login_validate_user, register_validate_user } from '../validations/users.validation.js';
import { validation_err_handler } from '../middlewares/validation.handler.js';

const router = Router();

router.route('/login').post(login_validate_user, validation_err_handler, login);
router.route('/register').post(register_validate_user, validation_err_handler, register);



export default router;