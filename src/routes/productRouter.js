const expreess = require('express');
const productRouter = expreess.Router();

const productController = require('../controllers/productController');

productRouter.get('', productController.getAllProducts);
productRouter.get('/:productId', productController.loadProductInfo);

module.exports = { productRouter };
