const express = require('express');

const { userRouter } = require('./userRouter');
const { orderRouter } = require('./orderRouter');

const routes = express.Router();

routes.use('/users', userRouter);
routes.use('/orders', orderRouter);

module.exports = { routes };
