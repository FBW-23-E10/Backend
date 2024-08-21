import User from '../models/User.js';
import createError from 'http-errors';

import { isValidId } from '../middleware/errorHandlers.js';

export const getUsers = async (req, res, next) => {
  try {
    console.log(req.query);
    const users = await User.find(req.query);
    if (users.length > 0) res.status(200).json(users);
    else throw createError.NotFound('no users found');
  } catch (e) {
    next(e);
  }
};

export const getUser = async (req, res, next) => {
  console.log('getUser');
  try {
    const { id } = req.params;
    console.log(req.params);

    const user = await User.findById(id);

    if (user) res.status(200).json(user);
    else throw createError.NotFound('no users found');
  } catch (e) {
    next(e);
  }
};

export const addUser = async (req, res, next) => {
  console.log(req);

  try {
    const user = await User.create(req.body);
    res.status(200).json({
      submittedUSer: user,
      message: 'user was added to the database',
    });
  } catch (e) {
    next(e);
  }
};