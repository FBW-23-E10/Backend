import {User} from '../models/users.model.js';

export const register = async(req, res, next) => {
    console.log('register controller starts')
    try {
        const {fullname, email, password} = req.body;
        const newuser = await User.create({fullname, email, password});
        res.json({msg: 'registered successfully', newuser});

    } catch (error) {
        next(error)
    }
};


/* ------------------- login ------------------ */
export const login = async(req, res, next) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            const err = new Error("Invalid login data!");
            err.status = 400;
            throw err;
        }

        const user = await User.findOne({email, password});
        if(!user){
            const err = new Error("Incorrect email/password!");
            err.status = 403;
            throw err;
        }

        res.json({msg: 'login success', user});
    } catch (error) {
        next(error)
    }
}