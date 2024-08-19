import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import userRouter from './routers/users.router.js'
import productRouter from './routers/product.router.js'
import { connectToDB } from './utils/database.js';

dotenv.config();
const app = express();

// create db connection
connectToDB();


// middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/users', userRouter);
app.use('/products', productRouter);

// error handling
app.use((req, res, next) => {
    const err = new Error('Route not defined!');
    err.status = 404;
    next(err);
});

app.use((error, req, res, next) => {
    if(error){
        res.status(error.status || 500)
            .json({msg: error.message, status: error.status})
    }
})

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server is up on port ${port} 🚀`));