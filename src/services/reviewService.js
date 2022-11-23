const reviewDao = require('../models/reviewDao');
const { raiseCustomError } = require('../utils/raiseError');

const postReview = async (
  userId,
  productId,
  title,
  content,
  score,
  imageUrl
) => {
  const Existence = await reviewDao.checkExistence(userId, productId);
  if (Existence.existence === '1') {
    raiseCustomError('이미 리뷰한 제품입니다.', 400);
  }
  await reviewDao.postReview(
    userId,
    productId,
    title,
    content,
    score,
    imageUrl
  );
};

const deleteReview = async (userId, productId) => {
  await reviewDao.deleteReview(userId, productId);
};

const getReview = async (reviewId) => {
  const reviewData = await reviewDao.getReview(reviewId);
  return reviewData;
};

const patchReview = async (
  title,
  content,
  imageUrl,
  score,
  userId,
  productId
) => {
  return await reviewDao.updateReview(
    title,
    content,
    imageUrl,
    score,
    userId,
    productId
  );
};

const getAllReivews = async (userId) => {
  const userReviewData = await reviewDao.getAllReivews(userId);
  return userReviewData;
};

module.exports = {
  postReview,
  deleteReview,
  getReview,
  patchReview,
  getAllReivews,
};
