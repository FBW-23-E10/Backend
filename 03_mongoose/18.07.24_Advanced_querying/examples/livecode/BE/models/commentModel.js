import mongoose from 'mongoose';
import { model, Schema } from 'mongoose';
import { User } from './userModel.js';

const commentSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: String,
});

export const Comment = model('Comment', commentSchema);
