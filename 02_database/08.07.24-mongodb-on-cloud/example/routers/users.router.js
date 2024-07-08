const router = require("express").Router();

router
  .route("/")
  .get((req, res, next) => {
    try {
      // list users
      const user = {
        name: "fahim",
        email: "fahim@mail.com",
        password: "123fahim",
      };
      if (!user) {
        const err = new Error("No user found!");
        err.status = 204;
        throw err;
      }
        
      res.status(200).json({ user });
    
    } catch (error) {      
        next(err);
    }
  })
  .post()
  .put()
  .delete();


module.exports = router;