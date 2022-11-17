const routes = require('express').Router();

const { productRouter } = require('./productRouter');

routes.use('/products', productRouter);

module.exports = { routes };
