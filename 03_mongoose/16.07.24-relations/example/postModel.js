import mongoose from "mongoose";
import { Schema,model } from "mongoose";

const postSchema = new Schema({
    title: String,
    desc: String,
    hearts: Number,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});


export const Post = model('POST', postSchema);