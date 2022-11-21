const express = require('express');

const productController = require('../controlloers/productController');

const productRouter = express.Router();

productRouter.get('/:productId', productController.loadProductInfo);

module.exports = { productRouter };
