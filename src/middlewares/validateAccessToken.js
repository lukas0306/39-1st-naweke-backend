const jwt = require('jsonwebtoken');
const { getUserByUserId } = require('../models/userDao');

const validateAccessToken = async (req, res, next) => {
  try {
    const accessToken = req.header('Authorization');
    const secretKey = process.env.SECRET_KEY;
    const payLoad = jwt.verify(accessToken, secretKey);
    const userId = payLoad.data;
    const user = await getUserByUserId(userId);

    if (!user) {
      return res.status(400).json('Invalid AccessToken');
    }

    req.body.userId = userId;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { validateAccessToken };
