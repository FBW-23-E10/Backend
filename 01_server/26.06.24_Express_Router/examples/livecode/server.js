import express from 'express';
import productsRouter from './routes/productsRouter.js';
import usersRouter from './routes/usersRouter.js';


const app = express();
const PORT = 3000;

app.use('/products',productsRouter)
app.use('/users',usersRouter)


app.get('/', (req, res) => {
    res.send('homepage');
  });

/* app.get('/products',(req, res) => {
  res.send('these are our products');
})
app.post('/products',(req, res) => {
  res.send('product added');
})
app.delete('/products',(req, res) => {
  res.send('product deleted');
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



app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
