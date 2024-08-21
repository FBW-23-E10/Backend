import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import User from './models/User.js';
import { addUser, getUser, getUsers } from './controllers/userControllers.js';

//APP INIT
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));
app.use(express.urlencoded({ extended: true }));

////////////////  MULTER    ////////////////
import multer from 'multer';

//const upload = multer({ dest: 'uploads/images' });

const storageConfig=multer.diskStorage({
destination: function(req,file,cb){
    cb(null,'uploads/images')
},
filename:function(req,file,cb){
    cb(null,Date.now()+'-'+file.originalname)
}

})

const upload = multer({ storage:storageConfig });

app.post('/upload', upload.single('avatar'), async (req, res, next) => {
  const uploadedFile = req.file;
  /* console.log(uploadedFile)
  console.log(req.body) */

  const uploadedValues = req.body.data;

  const user = await User.findOneAndUpdate({
    email: uploadedValues.email,
    avatar: uploadedFile.path,
  });

  res.send({ message: 'Upload successful', uploadedFile, uploadedValues });
});

////////////////  MULTER    ////////////////

//ROUTES
app.get('/users', getUsers);
app.get('/users/:id', getUser);
app.post('/users/signup', addUser);

//START LISTENING ON PORT

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});

//CONNECT TO MONGO_DB

mongoose.connect(process.env.DB_URI);

mongoose.connection.on('error', console.error).on('open', () => {
  console.log('Connected to DB');
});
