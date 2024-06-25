const express = require('express');
const {logger, log_to_file} = require('./middlewares/logging');
const app = express();

// built-in middleware
app.use(cors())             // third-party cors policy handler middleware
app.use(express.json())     // built-in request body parser middleware
app.use(morgan('tiny'))     // third-party logger middleware

// custom middlewares
// execute for every request with the path started with '/user'
app.use('/user/add', logger);   // custom middleware
app.use(log_to_file);           // will be execute for all routes


// routes (endpoint)
app.get('/', logger, log_to_file, (req, res) => {
    res.send('Your request handled successfully! 😀')
})

// another endpoint
app.get('/user', (req, res) => {
    res.send('req /user handled successfully!')
})



const port = 5000 || process.env.PORT;
app.listen(port, console.log(`server is up on port: ${port} 🚀`));