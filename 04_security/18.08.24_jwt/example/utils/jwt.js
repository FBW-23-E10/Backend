import jwt from 'jsonwebtoken';
import {promisify} from 'util';

// to create  a jwt token
export const createToken = async (payload, secret_key, options) => {
    const asyncSign = promisify(jwt.sign) // use async sign method
    return await asyncSign(payload, secret_key, options);
}


// to verify a jwt token
export const verifyToken = async (jwt_token, secrect_key) => {
    const asyncVerify = promisify(jwt.verify);
    return await asyncVerify(jwt_token, secrect_key)
}