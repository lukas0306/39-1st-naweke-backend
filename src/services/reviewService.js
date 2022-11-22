const reviewDao = require('../models/reviewDao');

const postReview = async (userId, productId, title, content, image_url) => {
  const checkId = await reviewDao.getReviewId(productId);
  if (!checkId) {
    const err = new Error('상품이 존재하지 않습니다.');
    err.statusCode = 400;
    throw err;
  }

  const reviewData = await reviewDao.checkExistence(userId, productId);
  const checkList = Number(reviewData?.checkList);
  if (checkList === 1) {
    const err = new Error('이미 리뷰한 상품입니다.');
    err.statusCode = 400;
    throw err;
  } else {
    await reviewDao.postReview(userId, productId, title, content, image_url);
  }
};

const cancelReview = async (userId, productId) => {
  await reviewDao.cancelReview(userId, productId);
};

module.exports = { postReview, cancelReview };
