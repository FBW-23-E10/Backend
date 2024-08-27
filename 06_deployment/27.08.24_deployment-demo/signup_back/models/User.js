import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String
    },

    username: { type: String },
  },
 
);

export default model('User', userSchema);
