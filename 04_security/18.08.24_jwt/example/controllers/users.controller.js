import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { User } from "../models/users.model.js";
import { genEmailTemplate } from "../utils/helper.js";
import { Verify } from "../models/verify.model.js";
import { createToken } from "../utils/jwt.js";

export const register = async (req, res, next) => {
  try {
    const { fullname, email, password, role } = req.body;
    const newuser = await User.create({ fullname, email, password, role });
    newuser.password = undefined;
    newuser.__v = undefined;

    // send an email
    // setup transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.mail.de",
      port: 465,
      secure: true,
      auth: {
        user: process.env.email,
        pass: process.env.password,
      },
    });

    //generate a random token and store it in db
    const token = crypto.randomBytes(16).toString("hex");
    await Verify.create({ token, userid: newuser._id });

    const info = await transporter.sendMail({
      from: process.env.email,
      to: email,
      subject: "Verify your account!",
      html: genEmailTemplate(fullname, token, newuser._id),
    });

    res.json({ msg: "registered successfully", newuser });
  } catch (error) {
    next(error);
  }
};

/* ------- handle verify link (request) ------- */
export const handleVerifyLink = async (req, res, next) => {
  try {
    const token = req.params.token;
    const uid = req.params.uid;

    const token_record = await Verify.findOne({ token, userid: uid });

    if (!token_record) {
      const err = new Error("verification link is not valid!");
      err.status = 404;
      throw err;
    }

    //if verification link is valid and clicked
    // activate user
    const user = await User.findByIdAndUpdate(uid, { isActivated: true });
    res.send("Thanks for verification!");
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

    const user = await User.findOne({ email, isActivated: true });
    if (!user) {
      const err = new Error("Incorrect email/password!");
      err.status = 403;
      throw err;
    }

    // check the password
    if (user.auth(password)) {
      // delete password from user before sending to frontend
      user.password = undefined;
      user.__v = undefined;
      delete user.password;

      // create the jwt token
      const jwt_token = await createToken({
        userid: user._id, fullname: user.fullname, role: user.role}, // payload
        process.env.jwt_secret,  // secrect_key
        {expiresIn: '1d'}, //token option (exp date, algorthm,...)
        );

      

      res.json({ msg: "login success", user, jwt_token });
    } else {
      res.json({ msg: "email/password is incorrect", status: 403 });
    }
  } catch (error) {
    next(error);
  }
};

/* ---------------- update user --------------- */
export const updateUser = async (req, res, next) => {
  try {
    const { fullname, email, password } = req.body;
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

/* ----------------- sendEmail ---------------- */
export const sendEmail = async (req, res, next) => {
  try {
    // setup transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.mail.de",
      port: 465,
      secure: true,
      auth: {
        user: process.env.email,
        pass: process.env.password,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.email,
      to: "doe430667@gmail.com",
      subject: "Test Nodemailer",
      html: 'hello <strong style="color:blue">Fahim</strong>',
    });

    console.log(info);
    res.json(info);
  } catch (error) {
    next(error);
  }
};
