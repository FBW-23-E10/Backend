import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { Verify_token } from '../models/users.model.js';


export const verification_token = async(user) => {
    try {
        const verify_token = crypto.randomBytes(16).toString('hex');
        return await Verify_token.create({
            token: verify_token,
            userid: user._id
        });

    } catch (error) {
        console.error(error);
    }
}

/* ------ template for verification email ----- */
export const genEmailTemplate = (name, token, userid) => {
    const link = `https://localhost:5000/users/confirm/${token}/${userid}`
    return `
        Hi ${name}!<br/><br/>
        Thank you for joining us. Please click on the following link to confirm and activate your account: <br />
        <a href="${link}">${link}</a><br/><br/>

        good luck!
    `
}

/* ------ activate user by sending email ------ */
export const send_activate_email = async function(newuser, token){
    try {
        // setup transporter
        const transporter = nodemailer.createTransport({
            host: "smtp.mail.de",
            port: 465,
            secure: true,
            auth:{
                user: process.env.email,
                pass: process.env.password,
            }
        });
        // send email
        const info = await transporter.sendMail({
            from: process.env.email,
            to: newuser.email,
            subject: "Verify your account!",
            html: genEmailTemplate(newuser.fullname, token, newuser._id)
        });

        return info;

    } catch (error) {
        console.error(error);
    }
}


/* -------------- error generator ------------- */
export const createError = (msg, status) => {
    const err = new Error(msg);
    err.status = status;

    return err;
}