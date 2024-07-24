import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, '`Name` field is required!'],
    match: /^[a-zA-Z\s]{3,}$/,
    message: "Name Pattern doesn't match with the given value!",
  },

  email: {
    type: String,
    required: [true, '`Email` field is required!'],
    unique: [true, 'This Email is already in use!'],
  },

  password: {
    type: String,
    required: [true, '`Password` field is required!'],
    // match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
    message: "Password pattern doesn't match with the given value!",
  },
});

userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      next();
    } else {
  
      const salt = await bcrypt.genSalt(12);
 
      this.password = await bcrypt.hash(this.password, salt);
      // this.password = await bcrypt.hash(this.password, 12);
      next();
    }
  } catch (error) {
    next(error);
  }
});

userSchema.methods.authenticate = async (inputPassword, userPassword) => {
  return await bcrypt.compare(inputPassword, userPassword);
};

export const User = model('User', userSchema);
