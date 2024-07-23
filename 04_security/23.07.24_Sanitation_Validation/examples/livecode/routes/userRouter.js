import { Router } from 'express';
import { User } from '../models/userModel.js';

import sanitizeInput from '../middleware/sanitizeInput.js';
import validateInput from '../middleware/validateInput.js';

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
  .post(
    validateInput,
    sanitizeInput,
    async (req, res, next) => {
      try {
        const newUser = req.body;
  
        await User.create(newUser);

        const existingUsers = await User.find();
        res.status(201).send(existingUsers);
      } catch (error) {
        next(error);
      }
    }
  );

export default userRouter;
