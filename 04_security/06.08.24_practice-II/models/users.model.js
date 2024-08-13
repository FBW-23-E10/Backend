import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    // match: /^(?=.*[a-z])(?=.*[A-Z]){5,}$/
  },
});


userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified('password')) {
          next();
        }
        
        // hash the password
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
        
    } catch (error) {
        next(error)
    }
});




export const User = model("User", userSchema);
