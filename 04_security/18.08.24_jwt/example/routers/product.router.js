import express from 'express';
import { addProduct, getProducts } from '../controllers/products.controller.js';
import productValidation from '../validations/products.validation.js';
import { handleValidationResults } from '../middlewares/users.mw.js';
import { protect, restrictTo } from '../middlewares/auth.js';
const router = express.Router();


router
  .route("/")
  .get(protect, restrictTo('owner', 'guest'), getProducts)
  .post(protect, restrictTo('admin', 'owner'), productValidation, handleValidationResults, addProduct);

export default router;