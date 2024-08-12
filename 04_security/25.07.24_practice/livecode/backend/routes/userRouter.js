import { Router } from 'express';
import sanitizeInput from '../middleware/sanitizeInput.js';
import validateInput from '../middleware/validateInput.js';
import sanitizeLoginData from '../middleware/sanitizeLoginData.js';
import validateLoginData from '../middleware/validateLoginData.js';
import {
  getUsers,
  registerUser,
  loginUser,
} from '../controllers/userControllers.js';
const userRouter = Router();

userRouter.route('/').get(getUsers);
userRouter.route('/register').post(validateInput, sanitizeInput, registerUser);
userRouter
  .route('/login')
  .post(validateLoginData, sanitizeLoginData, loginUser);

export default userRouter;
