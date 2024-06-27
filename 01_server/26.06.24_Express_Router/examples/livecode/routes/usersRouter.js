
import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.js';
import { isLoggedInMiddleware } from '../middlewares/isLoggedIn.js';
const usersRouter = Router();



const getAllUsers = (req, res) => {
   console.log(req.query)
  res.send('these are our users');
};
const addNewUser = (req, res) => {
  res.send('users added');
};
const deleteAllUsers = (req, res) => {
  res.send('users deleted');
};
const updateAllUsers = (req, res) => {
  res.send('users updated');
};

usersRouter
  .route('/')
  .get(authMiddleware,getAllUsers)
  .post(addNewUser)
  .delete(authMiddleware,deleteAllUsers)
  .patch(updateAllUsers);



const getSingleUser = (req, res) => {
  res.send('individual user ');
};
const deleteSingleUser = (req, res) => {
  res.send('individual user deleted');
};
const updateSingleUser = (req, res) => {
  res.send('individual user updated');
};

usersRouter
  .route('/:id')
  .get(getSingleUser)
  .delete(deleteSingleUser)
  .patch(updateSingleUser);

const getCart=(req,res)=>{
    res.send('this is your cart')
}
const emptyCart=(req,res)=>{
    res.send('your cart is now empty')
}
const updateCart=(req,res)=>{
    res.send('cart updated')
}



usersRouter
  .route('/:id/cart')
  .get(isLoggedInMiddleware,getCart)
  .delete(isLoggedInMiddleware,emptyCart)
  .patch(isLoggedInMiddleware,updateCart);

export default usersRouter;