const express = require('express');

const { cartsRouter } = require('./cartsRouter');
const { userRouter } = require('./userRouter');

const routes = express.Router();

routes.use('/carts', cartsRouter);
routes.use('/users', userRouter);

module.exports = { routes };
