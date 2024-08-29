import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    // required: true,
  },
  is_activated: {
    type: Boolean,
    default: false,
  },

  create_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    // for password changes
    type: Date,
  },
});

// hashing the password
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.updated_at = Date.now();
  } catch (error) {
    next(error);
  }
});

// compare password with hash value
userSchema.methods.comparePass = async function(plainPass) {
    return await bcrypt.compare(plainPass, this.password)
}

const User = model("User", userSchema);
export default User;
