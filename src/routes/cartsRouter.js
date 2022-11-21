const express = require('express');

const cartsRouter = express.Router();

const { validateAccessToken } = require('../middlewares/validateAccessToken');
const { addItemToCartsController } = require('../controllers/cartsController');

cartsRouter.post('/', validateAccessToken, addItemToCartsController);

module.exports = { cartsRouter };
