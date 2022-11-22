const reviewRouter = require('express').Router();
const { validateAccessToken } = require('../middlewares/validateAccessToken');
const reviewController = require('../controllers/reviewController');

reviewRouter.post('', validateAccessToken, reviewController.postReview);
reviewRouter.delete('', validateAccessToken, reviewController.cancelReview);
module.exports = { reviewRouter };
