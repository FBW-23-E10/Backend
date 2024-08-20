import User from "../models/users.model.js"
import { createError } from "../utils/helper.js"
import { verifyToken } from "../utils/jwt.js"

export const protect = async(req, res, next) => {
    try {
        
        // extract token from request
        const token = req.cookies.jwt_token //|| req.headers?.authorization?.split(" ")[1]  // 'Bearer lksdfjsldkfjslkfjsflksjdflksjdflskjf'

        // verify the token
        const token_payload = await verifyToken(token, process.env.jwt_secret)

        // if the user deleted after token generated
        const user = await User.findById(token_payload.userid);
        if(!user){
            throw createError('The user who owns this token, already deleted!', 401);
        }

        // user changed his password after token generated
        const token_issue_time = token_payload.iat*1000;
        const password_changed_time = new Date(user.update_at).getTime();
        if(token_issue_time < password_changed_time){
            throw createError('The token is not valid anymore, because the password changed.', 401)
        }
        

        // attach the payload of token to the request
        req.token_payload = token_payload;
        next()
    } catch (error) {
        next(error)
    }
}



// handle the user's role
export const restrictto = (...allowed_roles) => {
    return async(req, res, next) => {
        try {
            const userid = req.token_payload.userid;
            const user = await User.findById(userid);

            if(!allowed_roles.includes(user.role)){
                throw createError('You are not permitted to do this operation', 403)
            }

            next();
        } catch (error) {
            next(error)
        }
    }
}