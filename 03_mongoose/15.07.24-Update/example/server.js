import express from 'express';
import dotenv from 'dotenv';
import booksRouter from './routers/books.router.js';
import { con2db } from './utilities/database.js';


dotenv.config();
const app = express();

// database connection
con2db()

// middlewares for parsing the requests
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// routers
app.use('/books', booksRouter)

// handling errors
app.use((req, res, next)=>{
    const err = new Error('Route not defined!');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next)=>{
    if(err){
        const statusCode = err.status || 500;
        res.status(statusCode).json({status: 'failed', msg: err.message});
    }
})


// port
const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server is up on port: ${port} 🚀`));