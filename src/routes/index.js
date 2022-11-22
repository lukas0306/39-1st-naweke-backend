const routes = require('express').Router();

const { userRouter } = require('./userRouter');
const { productRouter } = require('./productRouter');
const { cartsRouter } = require('./cartsRouter');
const { orderRouter } = require('./orderRouter');

routes.use('/users', userRouter);
routes.use('/products', productRouter);
routes.use('/carts', cartsRouter);
routes.use('/orders', orderRouter);

module.exports = { routes };
