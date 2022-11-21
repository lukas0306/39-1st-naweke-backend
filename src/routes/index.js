const express = require('express');

const { userRouter } = require('./userRouter');
const { productRouter } = require('./productRouter');

const routes = express.Router();

routes.use('/users', userRouter);
routes.use('/products', productRouter);

module.exports = { routes };
