import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
<<<<<<< HEAD
import { Post, User } from './models.js';
import { generateUsers } from './fake_data.js';

=======
import { User } from './models.js';
import { Post } from './postModel.js';
>>>>>>> f2b90c015d80d446ca58daa940956f35eefd2926
dotenv.config();
const app = express();

// db con
mongoose.connect('mongodb+srv://noname:1234@cluster0.1b1vhee.mongodb.net/');
mongoose.connection.on('connected', ()=>{console.log('connection established! 😀')})
mongoose.connection.on('error', (err)=>console.log('db con err:', err.message))

// seeding data
// generateUsers();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.post('/user', async(req, res, next) => {
    try {
        const newUser = await User.create(req.body);
        res.json(newUser)

    } catch (error) {
        next(error)
    }
});


// to post something
app.post('/post', async(req, res, next) => {
    try {
        const newPost = await Post.create({
          title: req.body.title,
          desc: req.body.desc,
          hearts: req.body.hears,
          author: req.body.author,
        });

        res.json(newPost)
    } catch (error) {
        next(error)
    }
})


// get list of posts
app.get('/post', async(req, res, next) => {
    try {
        
        const posts = await Post.find().populate('author',[ 'email','fullname']).exec();
        res.json(posts)

    } catch (error) {
        next(error)
    }
})


app.use((err, req, res, next)=>{
    if(err){
        res.status(err.status || 500).json({status: 'faild', message: err.message});
    }
})

const port = 8000;
app.listen(port, console.log(`server is up on port: ${port} 🚀`))