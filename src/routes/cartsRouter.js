const express = require('express');

const cartsRouter = express.Router();

const {
  addItemToCartsController,
  getCartsController,
  modifyQuantityController,
} = require('../controllers/cartsController');
const { validateAccessToken } = require('../middlewares/validateAccessToken');

cartsRouter.get('/', validateAccessToken, getCartsController);
cartsRouter.post('/', validateAccessToken, addItemToCartsController);
cartsRouter.patch('/:cartId', validateAccessToken, modifyQuantityController);

module.exports = { cartsRouter };
