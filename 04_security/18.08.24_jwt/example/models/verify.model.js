import {Schema, model} from 'mongoose';


const verifySchema = new Schema({
    token: { 
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true
    }
});

export const Verify = model('Verify', verifySchema);