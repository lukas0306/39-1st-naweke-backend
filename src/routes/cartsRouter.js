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
const { validateAccessToken } = require('../middlewares/validateAccessToken');

cartsRouter.post('/', validateAccessToken, addItemToCartsController);

module.exports = { cartsRouter };
