const express = require('express');

const cartsRouter = express.Router();

const {
  addItemToCartsController,
  getCartsController,
} = require('../controllers/cartsController');
const { validateAccessToken } = require('../middlewares/validateAccessToken');

cartsRouter.get('/', getCartsController);
cartsRouter.post('/', validateAccessToken, addItemToCartsController);

module.exports = { cartsRouter };
