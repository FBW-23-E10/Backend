import express from 'express';
import { addOrder } from '../controllers/orders.controller.js';
import { protect, restrictto } from '../middlewares/auth.js';
const router = express.Router();

router.route('/:uid').post(protect, restrictto('customer', 'guest', 'admin'), addOrder);

export default router;