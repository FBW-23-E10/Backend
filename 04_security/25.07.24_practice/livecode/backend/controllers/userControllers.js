import { User } from '../models/userModel.js';

export const getUsers = async (req, res, next) => {
  try {
    const Users = await User.find({});

    res.send(Users);
  } catch (error) {
    next(error);
  }
};

export const registerUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const newUser = await User.create(req.body);

    res.send({
      message: `Congrats, you registered  , now log in please!!!`,
    });
  } catch (error) {
    next(error);
  }
};


/* Middleware responsible for logging users in */
export const loginUser = async (req, res, next) => {
  try {


    /* need to find a user saved in the DB based on the email address from the request before we can match the password  */
    const userToLogIn = await User.findOne({ email: req.body.email });

    /* matching the password from the request with the one stored in the user we found based on the email  */
    const passwordCorrect = userToLogIn.authenticate(
      req.body.password,
      userToLogIn.password
    );

    /* If no user was found or the passwords didn't match, we throw an error */
    if (!userToLogIn || !passwordCorrect) {
      throw new Error('Sorry, incorrect email or password !');
    }


    /* Otherwise we send a response */
    res.send({
      message: `Welcome ${userToLogIn.name}`,
      user: {
        id: userToLogIn._id,
        name: userToLogIn.name,
        email: userToLogIn.email
      },
    });
  } catch (error) {
    next(error);
  }
};
