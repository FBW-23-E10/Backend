import mongoose,{Schema, model} from 'mongoose';

const userSchema = new Schema({
    fullname: {type: String, required: true},
    email: {type: String, unique: true},
     posts: [{type: mongoose.Schema.Types.ObjectId, ref:'POST'}] 
});



export const User = model('User', userSchema);

