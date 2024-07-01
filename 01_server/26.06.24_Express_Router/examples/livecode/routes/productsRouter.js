/* import express from 'express' */
/* const productsRouter=express.Router() */
import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.js';
const productsRouter = Router();

// CONVERTING OUR ORIGINAL ROUTES TO WORK WITH THE ROUTER

/* productsRouter.get('/',(req, res) => {
    res.send('these are our products');
  })
  productsRouter.post('/',(req, res) => {
    res.send('products added');
  })
  productsRouter.delete('/',(req, res) => {
    res.send('products deleted');
  })
  productsRouter.patch('/',(req, res) => {
    res.send('products updated');
  })
  productsRouter.get('/:id',(req, res) => {
    res.send('individual product ');
  })
  productsRouter.delete('/:id',(req, res) => {
    res.send('individual product deleted');
  })
  productsRouter.patch('/:id',(req, res) => {
    res.send('individual product updated');
  })  */

//CHAINING METHODS TO THE ROUTER THAT BELONG TO THE SAME ROUTE

/* productsRouter
  .get('/', (req, res) => {
    res.send('these are our products');
  })
  .post('/', (req, res) => {
    res.send('products added');
  })
  .delete('/', (req, res) => {
    res.send('products deleted');
  })
  .patch('/', (req, res) => {
    res.send('products updated');
  }); */

/* productsRouter
  .get('/:id', (req, res) => {
    res.send('individual product ');
  })
  .delete('/:id', (req, res) => {
    res.send('individual product deleted');
  })
  .patch('/:id', (req, res) => {
    res.send('individual product updated');
  }); */

const getAllProducts = (req, res) => {
   console.log(req.query)
  res.send('these are our products');
};
const addNewProduct = (req, res) => {
  res.send('products added');
};
const deleteAllProducts = (req, res) => {
  res.send('products deleted');
};
const updateAllProducts = (req, res) => {
  res.send('products updated');
};

productsRouter
  .route('/')
  .get(getAllProducts)
  .post(authMiddleware ,addNewProduct)
  .delete(authMiddleware,deleteAllProducts)
  .patch(updateAllProducts);



const getSingleProduct = (req, res) => {
  res.send('individual product ');
};
const deleteSingleProduct = (req, res) => {
  res.send('individual product deleted');
};
const updateSingleProduct = (req, res) => {
  res.send('individual product updated');
};

productsRouter
  .route('/:id')
  .get(getSingleProduct)
  .delete(authMiddleware,deleteSingleProduct)
  .patch(updateSingleProduct);

export default productsRouter;

//ORIGINAL ROUTES THAT USED TO BE IN SERVER.JS

/* app.get('/products',(req, res) => {
    res.send('these are our products');
  })
  app.post('/products',(req, res) => {
    res.send('product added');
  })
  app.delete('/products',(req, res) => {
    res.send('products deleted');
  })
  app.patch('/products',(req, res) => {
    res.send('product updated');
  })
  app.get('/products/:id',(req, res) => {
    res.send('individual product ');
  })
  app.delete('/products/:id',(req, res) => {
    res.send('individual product deleted');
  })
  app.patch('/products/:id',(req, res) => {
    res.send('individual product updated');
  }) */
