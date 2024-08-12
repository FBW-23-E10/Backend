import {Schema, model} from 'mongoose';


const userSchema = new Schema({
    fullname: { 
        type: String,
        required: true,
        minLength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        // match: /^(?=.*[a-z])(?=.*[A-Z]){5,}$/
    }
});

export const User = model('User', userSchema);
