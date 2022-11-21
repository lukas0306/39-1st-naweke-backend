const express = require('express');

const { cartsRouter } = require('./cartsRouter');
const { userRouter } = require('./userRouter');
const { productRouter } = require('./productRouter');

const routes = express.Router();

routes.use('/carts', cartsRouter);
routes.use('/users', userRouter);
routes.use('/products', productRouter);

module.exports = { routes };
