const express = require('express');

const cartsRouter = express.Router();

const cartsController = require('../controllers/cartsController');
const { validateAccessToken } = require('../middlewares/validateAccessToken');

cartsRouter.get('/', validateAccessToken, cartsController.getCarts);
cartsRouter.post('/', validateAccessToken, cartsController.addItemToCarts);
cartsRouter.delete(
  '/delete',
  validateAccessToken,
  cartsController.deleteProduct
);

module.exports = { cartsRouter };
