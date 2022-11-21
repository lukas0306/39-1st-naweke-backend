const express = require('express');

const { userRouter } = require('./userRouter');
const { orderRouter } = require('./orderRouter');
const { productRouter } = require('./productRouter');

const routes = express.Router();

routes.use('/users', userRouter);
routes.use('/orders', orderRouter);
routes.use('/products', productRouter);

module.exports = { routes };
