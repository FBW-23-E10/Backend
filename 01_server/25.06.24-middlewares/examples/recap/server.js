const express = require('express');
const products = require('./data.js');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

// middlewares
app.use(cors())             // third-party cors policy handler middleware

// route handlers
app.get('/product/list', (req, res) => {
    res.json(products)
});

// get one product
app.get('/product/:id', (req, res) => {
    const pid = req.params.id;
    const result = products.filter(product => product.id == pid)
    res.json(result)
})

app.delete('/product/:id/remove/', (req, res) => {
    const pid = req.params.id;
    const result = products.filter(prod => prod.id != pid)
    res.json(result)
})


const port= 5000 || process.env.PORT;
app.listen(port, 
    console.log(`Server up and running on port: ${port} 🚀`))


