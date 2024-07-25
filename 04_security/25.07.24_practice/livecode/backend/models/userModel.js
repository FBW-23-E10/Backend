import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

/* Using the 'pre' Mongoose Hook before the Document is saved during the creation process */
userSchema.pre('save', async function (next) {
  try {
    /* If the password is not being changed ( in our case it always will be changed, since we are just creating the Document) the function would call next() straight away, omitting hashing and owerwriting the userpassword */
    if (!this.isModified('password')) {
      next();
    } else {
      /* generating salt for hashing */
      const salt = await bcrypt.genSalt(12);
      /* hashing the password and saving the hashed version in the Document */
      this.password = await bcrypt.hash(this.password, salt);

      next();
    }
  } catch (e) {
    next(e);
  }
});


/* We add a custom method to the Schema for comparing whether the password entered during login matches the one we stored. bcrypt has a built in compare method for this purpose, it takes the "user-entered-password" from the request and the one we saved in the document. If they match, the login middleware will continue to sending a response */
userSchema.methods.authenticate = async function (inputPassword, userPassword) {
  return await bcrypt.compare(inputPassword, userPassword);
};

export const User = model('User', userSchema);
