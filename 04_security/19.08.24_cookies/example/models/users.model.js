import {model, Schema} from 'mongoose';
import bcrypt from 'bcrypt';


const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        default: 'guest',
        enum: ['admin', 'customer', 'guest', 'owner']
    },

    is_activated: {
        type: Boolean,
        default: false,
    },

    update_at: {
        type: Date
    }
});



/* --------- middleware hash password --------- */
userSchema.pre('save', async function(next){
    try {
        // if password not modified
        if(!this.isModified('password')){
            next();
        }

        // if password modified, hash the password
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);

        this.update_at = Date.now(); // set the password update time 
        next();

    } catch (error) {
        next(error)
    }
});



// compare hashed password with give password by user
userSchema.methods.comparePassword = async function(plainTextPass){
    return await bcrypt.compare(plainTextPass, this.password);
}

const User = model('User', userSchema);




/* ------------ verification token ------------ */
const verify_token_schema = new Schema({
    token: {
        type: String,
        required: true
    },
    
    userid: {
        type: String,
        required: true
    }
    
});



export const Verify_token = model('Verify_token', verify_token_schema);
export default User;

