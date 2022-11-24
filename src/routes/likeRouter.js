const likeRouter = require('express').Router();

const likeController = require('../controllers/likeControllers');
const { validateAccessToken } = require('../middlewares/validateAccessToken');

likeRouter.post('', validateAccessToken, likeController.postLike);

module.exports = { likeRouter };
