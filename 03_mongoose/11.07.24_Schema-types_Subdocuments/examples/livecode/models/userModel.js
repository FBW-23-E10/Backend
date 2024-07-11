import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const addressSchema = new Schema(
  {
    street: { type: String, required: true },
    city: String,
    nr: String,
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    name: { type: String, default: 'Joe Black' },
    email: { type: String,unique:true},
    homeaddress: addressSchema,
    billingaddress: addressSchema,
    /* addresses:[addressSchema], */
    hobbies: {
      type: [],
      default: [],
    },
    password: { type: String, default: '1234' },
    age: { type: Number, /*  default: 1, */ min: 1, max: 150 },
    married: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = model('User', userSchema);
