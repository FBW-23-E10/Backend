import mongoose from 'mongoose';
import { model, Schema } from 'mongoose';
/* import Comment from "./commentModel.js" */
const recordSchema = new Schema({
  title: String,
  artist: String,
  price: Number,
  genre:String,
  comments:{type:mongoose.Schema.Types.ObjectId, ref:"Comment"},

});

export const Record = model('Record', recordSchema);

