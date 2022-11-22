const routes = require('express').Router();

const { userRouter } = require('./userRouter');
const { productRouter } = require('./productRouter');
const { cartsRouter } = require('./cartsRouter');

routes.use('/users', userRouter);
routes.use('/products', productRouter);
routes.use('/carts', cartsRouter);

module.exports = { routes };
