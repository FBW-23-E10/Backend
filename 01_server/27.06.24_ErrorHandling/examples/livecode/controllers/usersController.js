import { users } from '../users.js';
import createError from 'http-errors';
//GET SINGLE USER

export const getUser = (req, res, next) => {
  const userId = parseInt(req.params.id);
  const userFound = users.find((user) => user.id === userId);
  if (isNaN(userId)) {
    const error = new Error('Sorry invalid ID');
    error.status = 400;
    return next(error);
  }
  if (!userFound) {
    const error = new Error('User not found');
    return next(error);
  }
  res.send({ message: 'user found', user: userFound });
};

//DELETE USER

export const deleteUser = (req, res, next) => {
  const userId = parseInt(req.params.id);
  const userFound = users.find((user) => user.id === userId);
  if (isNaN(userId)) {
    const error = new Error('Sorry invalid ID');
    return next(error);
  }
  if (!userFound) {
    const error = new Error('User not found');
    return next(error);
  }

  const userFoundIndex = users.findIndex((user) => user.id === userId);
  users.splice(userFoundIndex, 1);

  res.send({ message: 'user deleted', users });
};

// ADD USER

export const addUser = (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      const error = new Error('Sorry, credentials missing');
      error.status = 400;
      throw error;
    }

    users.push(req.body);
    res.status(201).send({ message: 'user added', users: users });
  } catch (error) {
    return next(error);
  }
};

//LOGIN

export const login = (req, res, next) => {
  const userId = Number(req.params.id);
  console.log(userId);
  const userFound = users.find((user) => user.id === userId);

  try {
    if (isNaN(userId)) {
      const error = new Error('Sorry invalid ID');
      error.status=500
      throw error;
    }
    if (!userFound) {
      const error = new Error('User not found');
      error.status=400
      throw error;
    }
    if (!req.body.email || !req.body.password) {
      const error = new Error('Sorry, credentials missing');
      error.status = 400;
      throw error;
    }
    if (
      req.body.email !== userFound.email ||
      req.body.password !== userFound.password
    ) {
      const error = createError(400, "The provided credentials didn't match");
      throw error;
    }

    res
      .status(200)
      .send({ message: 'congrats, you are logged in', user: userFound });
  } catch (error) {
    return next(error);
  }
};
