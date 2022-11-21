const express = require('express');

const orderController = require('../controlloers/orderController');

const orderRouter = express.Router();

orderRouter.get('/', orderController.getOrderList);

module.exports = { orderRouter };
