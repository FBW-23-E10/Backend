const express = require('express');
const data = require('./data');

const app = express();

// middleware to parse enclosed data
app.use(express.json());

// routes
// get all products - /product
app.get('/product', (req, res) => {
    if(data){
        res.send(data)
    }else{
        res.send('There is no product!')
    }
});


// add new product - /product/add
app.post('/product/add', (req, res) => {
    const new_product = req.body;
    data.push(new_product);
    res.json(data);
});


// update a product - /product/1/edit
app.put('/product/:pid/edit', (req, res) => {
    const product_id = req.params.pid;
    const updated_product = req.body;

    // check if the product exist
    const new_data_array = data.map(product => {
        if(product.id == product_id){
            // replace update product with old product
            product = updated_product;
        }
        return product;
    });

    res.send(new_data_array);
});


// update a product - /product/1/partialedit
app.patch('/product/:pid/partialedit', (req, res) => {
    const pid = req.params.pid;
    const updated_array = data.map(product => {
        if(product.id == pid){
            product = {...product, ...req.body}
        }

        return product;
    });

    res.send(updated_array);
});


// delete product - /product/1/remove
app.delete('/product/:pid/remove', (req, res) => {
    const pid = req.params.pid;
    const new_data_array = data.filter(product => product.id != pid);
    res.json(new_data_array)
})


const port = 5000 || process.env.PORT;
app.listen(port, 
    console.log(`Server up and running on port: ${port} 🚀`));