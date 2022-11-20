const { validateNickname, validatePassword } = require('../utils/validaters');
const { createUser } = require('../services/userService');
const { validateUser } = require('../services/userService');

const signUp = async (req, res, next) => {
  try {
    const { name, nickname, password, birth } = req.body;
    if (!name || !nickname || !password || !birth) {
      const err = new Error('Input all information');
      err.statusCode = 400;
      throw err;
    }
    validateNickname(nickname);
    validatePassword(password);

    await createUser(name, nickname, password, birth);
    return res.status(201).json({ message: 'User Created' });
  } catch (err) {
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

const logIn = async (req, res, next) => {
  try {
    const { nickname, password } = req.body;
    if (!nickname || !password) {
      const err = new Error('Input All Information');
      err.statusCode = 400;
      throw err;
    }
    validateNickname(nickname);
    validatePassword(password);

    const accessToken = await validateUser(nickname, password);
    return res.status(200).json({ message: accessToken });
  } catch (err) {
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

module.exports = { signUp, logIn };
