const express = require('express');

const cartsRouter = express.Router();

const {
  addItemToCartsController,
  getCartsController,
  deleteProductController,
} = require('../controllers/cartsController');

cartsRouter.post('/', addItemToCartsController);
cartsRouter.get('/', getCartsController);
cartsRouter.delete('/delete', deleteProductController);

module.exports = { cartsRouter };
