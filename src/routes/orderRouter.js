const express = require('express');

const orderController = require('../controlloers/orderController');

const orderRouter = express.Router();

orderRouter.post('/', orderController.addOrder);

module.exports = { orderRouter };
