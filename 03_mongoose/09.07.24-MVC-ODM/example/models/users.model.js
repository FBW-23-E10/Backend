const {model, Schema} = require('mongoose');

// create schema (shape of user data)
const userSchema = new Schema({
    name: {type: String},
    email: {type:String, unique: true},
    password: String,
});


// create model
const User = model('User', userSchema);
module.exports = User;