import User from '../models/User.js';

export const getUsers = async (req, res, next) => {
  console.log('run');
  console.log(req.query);
  const users = await User.find(req.query);
  if (users.length > 0) res.status(200).json(users);
};

export const getUser = async (req, res, next) => {
  const { id } = req.params;
  console.log(req.params);

  const user = await User.findById(id);

  if (user) res.status(200).json(user);
  else throw new Error('no users found');
};

export const addUser = async (req, res, next) => {
  console.log(req);

  const user = await User.create(req.body);
  res.status(200).json({
    submittedUSer: user,
    message: 'user was added to the database',
  });
};
