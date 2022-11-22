const express = require('express');

const cartsRouter = express.Router();

const {
  addItemToCartsController,
  getCartsController,
  deleteProductController,
} = require('../controllers/cartsController');
const { validateAccessToken } = require('../middlewares/validateAccessToken');

cartsRouter.get('/', validateAccessToken, getCartsController);
cartsRouter.post('/', validateAccessToken, addItemToCartsController);
cartsRouter.delete('/delete', validateAccessToken, deleteProductController);

module.exports = { cartsRouter };
