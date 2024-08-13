import { User } from "../models/users.model.js";
import bcrypt from 'bcrypt';


export const register = async (req, res, next) => {
  try {
    const { fullname, email, password } = req.body;
    const newuser = await User.create({ fullname, email, password });
    res.json({ msg: "registered successfully", newuser });
  } catch (error) {
    next(error);
  }
};

/* ------------------- login ------------------ */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const err = new Error("Invalid login data!");
      err.status = 400;
      throw err;
    }

    const user = await User.findOne({ email});
    if (!user) {
      const err = new Error("Incorrect email/password!");
      err.status = 403;
      throw err;
    }

    // check the password
    if(await bcrypt.compare(password, user.password)){
        res.json({ msg: "login success", user });
    }else{
        res.json({msg: "email/password is incorrect", status: 403});
    }

  } catch (error) {
    next(error);
  }
};

/* ---------------- update user --------------- */
export const updateUser = async (req, res, next) => {
  try {
    const {fullname, email, password} = req.body;
    const user = await User.findById(req.params.uid);
    user.fullname = fullname || user.fullname;
    user.email = email || user.email;
    user.password = password || user.password;

    await user.save();
    res.json({ msg: "success", updatedUser: user });

  } catch (error) {
    next(error);
  }
};
