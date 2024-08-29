import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { createError } from './utils/helpers.js';
import { conToDB } from './middlewares/database.js';
import userRouter from './routers/users.router.js';
import passport from './config/passport.config.js';



dotenv.config()
const app = express();

// database connection
conToDB();

// middlewares
app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

// define session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        name: 'userid',
        secure: false,
        httpOnly: true,
        maxAge: 1000*60*60*24
    }
}));

// passport with session
app.use(passport.initialize());
app.use(passport.session());


// routers
app.use('/users', userRouter);

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", 'email'] }));
app.get("/auth/google/callback", passport.authenticate('google', {failureRedirect: '/login'}), 
    function (req, res){
        console.log('Login process successfull done! 😍');
        res.redirect('http://localhost:3000/posts');
    })

// error handlers
app.use((req, res, next) => {
    next(createError('Route not defined!', 404));
});

app.use((err, req, res, next) => {
    if(err){
        res.status(req.status || 500)
           .json({msg: err.message, status: req.status})
    }
})


// port
const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server is up on port ${port} 🚀`));