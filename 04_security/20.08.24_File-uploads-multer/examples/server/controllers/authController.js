import User from '../models/User2.js';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { authError } from '../middleware/errorHandlers.js';
import Token from 'csrf';
import multer from 'multer'

const upload=multer({dest:'./uploads'})
//! Create CSRF Token
export const token = new Token();
const csrfSecret = token.secretSync();
const csrfToken = token.create(csrfSecret);
//! Create token
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP,
  });


//! Response handler
const createSendToken = (res, statusCode, user) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXP * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.cookie('user', user, cookieOptions);

  res.status(statusCode).json({
    message: 'success',
    success: true,
    status: statusCode,
    token,
    csrfToken,
    user,
  });
};

const uploadHandler=async(req)=>{
upload.single('avatar')
}

//! Signup conrtoller
export const signup = async (req, res, next) => {
  console.log(req.body)
  if(req.body.avatar){
    await uploadHandler(req)
  }

  console.log(token);
  try {
    const user = await User.create(req.body);

    createSendToken(res, 201, user);

  } catch (error) {
    next(error);
  }
};



//! login conrtoller
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { csrftoken } = req.headers;

    console.log(req.headers);

    if (!token.verify(csrfSecret, csrftoken))
      authError(403, 'Invalid CSRF Token');

    if (!email || !password)
      authError(400, 'Please provide email and password');

    const user = await User.findOne({ email });
    if (!user) authError(401, 'Incorrect email or password');

    const correct = await user.correctPassword(password, user.password);
    if (!correct) authError(401, 'Incorrect email or password');

    createSendToken(res, 200, user);
  } catch (error) {
    next(error);
  }
};

//! Protect route middleware
export const protect = async (req, res, next) => {
  try {
    let token;
    const { authorization } = req.headers;

    //* 1)  Check if token is exist
    if (authorization && authorization.startsWith('Bearer')) {
      token = authorization.split(' ')[1];
    }

    if (!token) {
      throw createError(401, 'Please login to access this resource');
    }

    //* 2) Verify the token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
      (error, decodedValue) => {
        if (error) {
          throw createError(401, error.message);
        }
        return decodedValue;
      }
    );
    //! Another way to get the decoded values using verify and promisify
    // const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    //* 3) Check if user is still exist
    const user = await User.findById(decoded.id);
    if (!user) {
      throw createError(
        401,
        'The user belonging to this token is no longer exist'
      );
    }

    //* 4) Check if user changed password after the token was issued
    // We'll implemnt step number 4 after the summer vacation,becasue we need to build passowrd reset functunality

    next(); // --> Grant access to protected resource
  } catch (error) {
    next(error);
  }
};