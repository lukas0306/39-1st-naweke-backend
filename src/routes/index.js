const express = require('express');

const { cartsRouter } = require('./cartsRouter');

const routes = express.Router();

routes.use('/carts', cartsRouter);

module.exports = { routes };
