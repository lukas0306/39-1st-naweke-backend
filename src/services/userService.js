const userDao = require('../models/userDao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createUser = async (name, nickname, password, birth) => {
  const user = await userDao.getUserByNickname(nickname);
  if (user) {
    const err = new Error('Duplicated Nickname');
    err.statusCode = 400;
    throw err;
  }

  const saltRounds = parseInt(process.env.SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  await userDao.createUser(name, nickname, hashedPassword, birth);
};

const validateUser = async (nickname, password) => {
  const user = await userDao.getUserByNickname(nickname);
  if (!user) {
    const err = new Error('Invalid Nickname');
    err.statusCode = 400;
    throw err;
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    const err = new Error('Invalid Password');
    err.statusCode = 400;
    throw err;
  }

  const secretKey = process.env.SECRET_KEY;
  const accessToken = jwt.sign(
    {
      data: user.id,
    },
    secretKey,
    {
      issuer: 'admin',
      subject: 'accessToken',
      expiresIn: '30 days',
    }
  );

  return accessToken;
};

module.exports = { createUser, validateUser };
