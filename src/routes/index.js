const routes = require('express').Router();

const { userRouter } = require('./userRouter');
const { productRouter } = require('./productRouter');
const { cartsRouter } = require('./cartsRouter');
const { orderRouter } = require('./orderRouter');
const { likeRouter } = require('./likeRouter');

routes.use('/users', userRouter);
routes.use('/products', productRouter);
routes.use('/carts', cartsRouter);
routes.use('/orders', orderRouter);
routes.use('/likes', likeRouter);

module.exports = { routes };
