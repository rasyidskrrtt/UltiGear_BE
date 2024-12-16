const express = require('express');  
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');
const authorization = require('../middleware/authorization');

const orderRoutes = express.Router();

orderRoutes.post('/orders', auth, authorization(['CUSTOMER']), orderController.createOrder); 
orderRoutes.get('/orders', auth, authorization(['CUSTOMER']), orderController.getAllOrders);  
orderRoutes.get('/orders/:id', auth, authorization(['CUSTOMER']), orderController.getOrderById); 
orderRoutes.put('/orders/:id', auth, authorization(['CUSTOMER']), orderController.updateOrderPaymentStatus);  
orderRoutes.delete('/orders/:id', auth, authorization(['CUSTOMER']), orderController.deleteOrder);  

module.exports = orderRoutes;
