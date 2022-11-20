const express = require('express');

const cartsRouter = express.Router();

const {
  addItemToCartsController,
  getCartsController,
} = require('../controllers/cartsController');

cartsRouter.post('/', addItemToCartsController);
cartsRouter.get('/', getCartsController);
cartsRouter.delete('/delete', getCartsController);

module.exports = { cartsRouter };
