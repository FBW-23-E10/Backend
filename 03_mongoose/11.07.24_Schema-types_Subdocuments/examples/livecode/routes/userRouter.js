import { Router } from 'express';
import { User } from '../models/userModel.js';

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
  .post(async (req, res, next) => {
    try {
      const newUser = new User(req.body);

      await User.create(newUser);
      const responseUser = await User.find({ _id: newUser._id });

      res.status(201).send(responseUser);
    } catch (error) {
      next(error);
    }

    /*  const newUser = req.body;
      await User.create(newUser);
      res.status(201).send(newUser); */
  });

userRouter
  .route('/:id')
  .get(async (req, res, next) => {
    try {
      const singleUser = await User.findById(req.params.id);
      res.status(200).send(singleUser);
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const singleUser = await User.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .send({ message: 'The following User was deleted', singleUser });
    } catch (error) {
      next(error);
    }
  });

export default userRouter;
