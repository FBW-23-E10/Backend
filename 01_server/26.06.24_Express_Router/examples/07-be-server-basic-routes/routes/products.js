import {Router} from "express";

const products = [
  {
    id: 1,
    name: "Product 1",
    price: 10.99,
    description: "This is product 1",
  },
  {
    id: 2,
    name: "Product 2",
    price: 19.99,
    description: "This is product 2",
  },
  {
    id: 3,
    name: "Product 3",
    price: 7.99,
    description: "This is product 3",
  },
];



const productsRouter=Router()

productsRouter.get('/',(req,res)=>{
  res.send(products)
})
productsRouter.get('/:id',(req,res)=>{
  res.send(products.find(product=>product.id==req.params.id))
})


export default productsRouter