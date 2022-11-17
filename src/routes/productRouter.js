const expreess = require('express');
const productRouter = expreess.Router();

const productController = require('../controllers/productController');

productRouter.get('/all', productController.getAllProducts);

module.exports = { productRouter };
