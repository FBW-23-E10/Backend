import { Router } from 'express';
import { User } from '../models/userModel.js';
import seedData from '../data/users.js';
const userRouter = Router();

userRouter
  .route('/')
  .get(async (req, res, next) => {
    try {
 
      const Users = await User.find({})
        .populate('comments', 'content')
  
        .exec();
      res.send(Users);
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newUser = req.body;
      await User.create(newUser);
      const existingUsers = await User.find();
      res.status(201).send(existingUsers);
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
  })
  .put(async (req, res, next) => {
    try {
      const singleUser = await User.findByIdAndUpdate(req.params.id, req.body);
      const updatedUser = await User.findById(req.params.id);
      res
        .status(200)
        .send({ message: 'The following User was updated', updatedUser });
    } catch (error) {
      next(error);
    }
  });

userRouter.route('/seed').post(async (req, res, next) => {
  try {
    const users = seedData.map((user) => new User(user));

    await User.deleteMany();
    console.log('Data Deleted successfuly');

    await User.insertMany(users);
    res.status(201).send(users);
  } catch (error) {
    next(error);
  }
});




export default userRouter;
