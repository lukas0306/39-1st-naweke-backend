const routes = require('express').Router();

const { userRouter } = require('./userRouter');
const { orderRouter } = require('./orderRouter');
const { productRouter } = require('./productRouter');
const { cartsRouter } = require('./cartsRouter');
const { reviewRouter } = require('./reviewRouter');

routes.use('/users', userRouter);
routes.use('/orders', orderRouter);
routes.use('/products', productRouter);
routes.use('/carts', cartsRouter);
routes.use('/reviews', reviewRouter);

module.exports = { routes };
