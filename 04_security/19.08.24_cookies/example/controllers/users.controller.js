import User, { Verify_token } from '../models/users.model.js';
import { createError, send_activate_email, verification_token } from '../utils/helper.js';
import { createToken } from '../utils/jwt.js';


/* ----------------- register ----------------- */
export const register = async(req, res, next) => {
    try {
        const {fullname, email, password, role} = req.body;
        const newuser = await User.create({fullname, email, password, role});
        
        // remove critical data
        newuser.password = undefined;
        newuser.__v = undefined;

        // save verification token in db
        const verify_token = await verification_token(newuser);

        // send user activation email
        await send_activate_email(newuser, verify_token.token);

        res.json({msg: 'registered successfully!', newuser });
    } catch (error) {
        next(error)
    }
}


/* ------------ handle verify link ------------ */
export const handleVerifyLink = async(req, res, next) => {
    try {
        const token = req.params.token;
        const uid = req.params.uid;
        console.log('token:',token, 'uid:',uid)

        // find token document from db
        const token_doc = await Verify_token.findOne({ token, userid: uid});
        if(!token_doc){
            throw createError("verification link is not valid!", 404);
        }

        // if verification link is valid and clicked
        console.log(token_doc)
        const user = await User.findOneAndUpdate({_id:token_doc.userid}, { is_activated: true});
        res.send("User actived successfully!");

    } catch (error) {
        next(error)
    }
}


/* ------------------- Login ------------------ */
export const login = async(req, res, next) => {
    try {
        const {email, password} = req.body;
        // find user by email
        const user = await User.findOne({email, is_activated: true});
        if(!user){ throw createError("Incorrect email/password!", 403)};

        // compare password (password not match)
        if(!user.comparePassword(password)){
            throw createError('Incorrect email//password!', 403);
        }

        // creat token
        const payload = {userid: user._id, fullname: user.fullname}
        const secret = process.env.jwt_secret
        const options ={ expiresIn: '1d'}
        const token = await createToken(payload, secret, options)
        
        user.password = undefined;
        user.__v = undefined;
        user.role = undefined;

        res
          .cookie("jwt_token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 3_600_000 * 24),
            // path: "/admin"
            //secure: true
          })
          .json({ msg: "login success", user });
        
    } catch (error) {
        next(error)
    }
}


/* ---------------- update user --------------- */
export const updateUser = async(req, res, next) => {
    try {
        const uid = req.params.uid;

        // update field
        const {fullname, email, password, role} = req.body;

        const user = await User.findById(uid)
        if(!user){
            throw createError('User not found!', 404);
        }

        user.fullname = fullname || user.fullname;
        user.email = email || user.email;
        user.password = password || user.password;
        user.role = role || user.role;

        await user.save();  // update the db

        user.password = undefined;
        user.role = undefined;
        res.json({
            msg: 'updated success',
            user
        });
    } catch (error) {
        next(error)
    }
}