const express = require('express');

const cartsRouter = express.Router();

const { addItemToCartsController } = require('../controllers/cartsController');

cartsRouter.post('/', addItemToCartsController);

module.exports = { cartsRouter };
