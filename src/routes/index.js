const routes = require('express').Router();

const { userRouter } = require('./userRouter');
const { productRouter } = require('./productRouter');

routes.use('/products', productRouter);
routes.use('/users', userRouter);

module.exports = { routes };
