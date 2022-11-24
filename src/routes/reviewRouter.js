const reviewRouter = require('express').Router();
const { validateAccessToken } = require('../middlewares/validateAccessToken');
const reviewController = require('../controllers/reviewController');

reviewRouter.get('', validateAccessToken, reviewController.getAllReivews);
reviewRouter.get('/:reviewId', validateAccessToken, reviewController.getReview);
reviewRouter.post('', validateAccessToken, reviewController.postReview);
reviewRouter.delete(
  '/:productId',
  validateAccessToken,
  reviewController.deleteReview
);
reviewRouter.patch('', validateAccessToken, reviewController.patchReview);

module.exports = { reviewRouter };
