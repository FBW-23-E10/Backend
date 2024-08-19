import { verifyToken } from "../utils/jwt.js";

/* ----------- verify the jwt-token ----------- */
export const protect = async (req, res, next) => {
  try {
    // extract token from the header
    const jwt_token = req?.headers?.authorization?.split(" ")[1];

    // if authorization header doesn't exist
    if (!jwt_token) {
      const err = new Error("Token not Found!");
      err.status = 401;
      throw err;
    }

    // if token exist
    const decoded_token = await verifyToken(jwt_token, process.env.jwt_secret);
    req.jwt_decoded = decoded_token;
    next()

  } catch (error) {
    next(error);
  }
};



/* ------------- manage the roles ------------- */
export const restrictTo = (...allowedRoles) => {
    return async(req, res, next) => {
        try {
            // if the role of user, who is the owner of the token
            // doesn't exist in the list of allowed roles, he/she is not allowed to run the controller.
            if(!allowedRoles.includes(req.jwt_decoded.role)){
                const err = new Error('You do not have permission to do this operation!');
                err.status = 403;
                throw err;
            }

            next()
        } catch (error) {
            next(error)
        }
    }
}