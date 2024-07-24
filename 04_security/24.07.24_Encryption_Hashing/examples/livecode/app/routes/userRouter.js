import { Router } from 'express';
import { User } from '../models/userModel.js';
import sanitizeInput from '../middleware/sanitizeInput.js';
import validateInput from '../middleware/validateInput.js';
import sanitizeLoginData from '../middleware/sanitizeLoginData.js';
import validateLoginData from '../middleware/validateLoginData.js';

const userRouter = Router();

userRouter
  .route('/')
  .get(async (req, res, next) => {
    try {
      const Users = await User.find({});

      res.send(Users);
    } catch (error) {
      next(error);
    }
  })
  .post(validateInput, sanitizeInput, async (req, res, next) => {
    try {
      const newUser = req.body;

      await User.create(newUser);
      const existingUsers = await User.find();
      res.status(201).send(existingUsers);
    } catch (error) {
      next(error);
    }
  });
userRouter
  .route('/login')
  .post(validateLoginData, sanitizeLoginData, async (req, res, next) => {
    try {
      const userToLogIn = await User.findOne({ email: req.body.email });

      const passwordCorrect = await userToLogIn.authenticate(req.body.password);

      if (!userToLogIn || !passwordCorrect) {
        throw new Error('Sorry, incorrect email or password !');
      }

      res.send('Congrats, you are logged in!');
    } catch (error) {
      next(error);
    }
  });

export default userRouter;
