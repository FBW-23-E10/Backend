import mongoose,{Schema, model} from 'mongoose';

const userSchema = new Schema({
    fullname: {type: String, required: true},
    email: {type: String, unique: true}
    // posts: [{type: mongoose.Schema.Types.ObjectId, ref:'POST'}] 
});


const postSchema = new Schema({
    title: String,
    desc: String,
    hearts: Number,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});


export const User = model('User', userSchema);
export const Post = model('POST', postSchema);

