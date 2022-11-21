const express = require('express');

const { userRouter } = require('./userRouter');
const { productRouter } = require('./productRouter');
const { orderRouter } = require('./orderRouter');

const routes = express.Router();

routes.use('/users', userRouter);
routes.use('/products', productRouter);
routes.use('/orders', orderRouter);

module.exports = { routes };
