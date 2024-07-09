const router = require("express").Router();
const User = require("../models/users.model");

router
  .route("/")
  .get(async(req, res, next) => {
    try {
      // list users
      const users = await User.find({name: "1"});
      if (!users) {
        const err = new Error("No user found!");
        err.status = 204;
        throw err;
      }

      res.status(200).json({ users });
    } catch (error) {
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newUser = await User.create(req.body);
      res.status(201).json(newUser);

    } catch (error) {
      next(error);
    }
  })
  .put()
  .delete();


// login route
router.route('/login')
  .post(async(req, res, next) => {
    try {
      const {email, password} = req.body;
      
      const user = await User.findOne({email: email, password: password},{email})
      
      // invalid credintials
      if(!user){
        res.status(404).json({message: 'email or password are not correct!'});
        return;
      }
      // correct credintials
      res.status(200).json({message: `welcome ${user.email}`})
      
    } catch (error) {
      next(error)
    }
  })

module.exports = router;
