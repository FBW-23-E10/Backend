import express from 'express';
import cors from 'cors';
import {data} from './data.js';

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.get('/user', (req, res)=>{
    console.log('request /user received to me!');
    res.send('get request handled')
})

app.post('/user/add', (req, res)=>{
    console.log(req.body);
    console.log('request /user/add received!');
    res.send('hello')
})

const port = 5000 || process.env.PORT;
app.listen(port, ()=>console.log('Server is running on port:',port))