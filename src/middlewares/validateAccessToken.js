const jwt = require('jsonwebtoken');
const { getUserByUserId } = require('../models/userDao');

const validateAccessToken = async (req, res, next) => {
  try {
    const accessToken = req.header('Authorization');
    const payLoad = jwt.verify(accessToken, precess.env.SECRET_KEY);
    const userId = payLoad.data;
    const user = await getUserByUserId(userId);

    if (!user) {
      return res.status(400).json('Invalid AccessToken');
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { validateAccessToken };
