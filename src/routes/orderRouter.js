const express = require('express');

const orderRouter = express.Router();

const orderController = require('../controllers/orderController');
const { validateAccessToken } = require('../middlewares/validateAccessToken');

orderRouter.get('/', validateAccessToken, orderController.getOrderList);
orderRouter.post('/', validateAccessToken, orderController.addOrder);

module.exports = { orderRouter };
