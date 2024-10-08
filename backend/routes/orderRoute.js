import express from 'express';
import { placeOrder, verifyOrder } from '../controller/orderController.js';
import authMiddleware from '../middleware/auth.js';


const orderRouter =  express.Router();


orderRouter.post('/place',authMiddleware, placeOrder );
orderRouter.post('/verify',authMiddleware, verifyOrder );

export default orderRouter;