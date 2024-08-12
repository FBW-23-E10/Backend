import mongoose from 'mongoose';
import { model, Schema } from 'mongoose';

const addressSchema = new Schema(
  {
    street: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    postCode: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const userSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    // required: [true, "First Name is required"],
  },

  lastName: {
    type: String,
     trim: true,
    // required: [true, "Last Name is required"],
  },

  age: {
    type: Number,
    //  required: [true, "Age is required"]
  },

  email: {
    type: String,
     //trim: true,
     //required: [true, "Email Name is required"],
    // unique:true,

    /*  match: [
       /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
       "Please enter a valid email",
   ],

    
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],

     match: /.+\@.+\..+/, */
  },


  password: {
    type: String,
    // trim: true,
    // required: [true, "Password is required"],
    // minLength: [8, "Password must be at least 8 charachters"],
    // maxLength: [16, "Password must be maximum 16 charachters long"],
  },

  passwordConfirm: { type: String,required: [true, "Password confirmation is required"] },
  address: addressSchema,
});

export const User = model('User', userSchema);
