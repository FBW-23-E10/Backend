import mongoose from 'mongoose';
import { model, Schema } from 'mongoose';
import {Comment} from './commentModel.js'
const addressSchema = new Schema({
  city: String,
  street: String,
  number:String,
  postcode: Number

}, { _id: false });


const userSchema = new Schema({
  name: {type:String,required:true},
  email: {type:String,unique:true},
  address:{type: addressSchema},
  role:String,
  age:{type:Number,
    
    min:1,
    max:150
  },
  comments:[{type:mongoose.Schema.Types.ObjectId, ref:"Comment"}]
});

export const User = model('User', userSchema);
