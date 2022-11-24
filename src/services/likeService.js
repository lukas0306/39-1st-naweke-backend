const likeDao = require('../models/likeDao');
const prodctDao = require('../models/productDao');

const postLike = async (userId, productId) => {
  const checkId = await prodctDao.getProductId(productId);
  if (!checkId) {
    const err = new Error('게시물이 존재하지 않습니다.');
    err.statusCode = 400;
    throw err;
  }

  const likeData = await likeDao.getLike(userId, productId);
  const checkList = Number(likeData?.checkList);
  if (checkList === 1) {
    await likeDao.deleteLike(userId, productId);
  } else {
    await likeDao.createLike(userId, productId);
  }
};

module.exports = { postLike };
