import passport from 'passport';
import { Strategy as GoogleStrategy} from 'passport-google-oauth20';
import User from '../models/users.model.js';
import dotenv from 'dotenv';

dotenv.config();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log(profile)
      try {
        let user = await User.findOne({email: profile.emails[0].value});
        if(user) return done(null, user); // users data is in db

        user = new User({
          fullname: profile.displayName,
          email: profile.emails[0].value,
          password: "",
          is_activated: true
        });

        await user.save();
        return done(null, user);

      } catch (error) {
        return done(error, false);
      }
    }
  )
);


// Serialize and deserilize user for cookies
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);

  } catch (error) {
    done(error, null);
  }
})

export default passport;