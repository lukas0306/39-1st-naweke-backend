const { validateNickname, validatePassword } = require('../utils/validaters');
const { createUser } = require('../services/userService');

const signUp = async (req, res, next) => {
  try {
    const { name, nickname, password, birth } = req.body;
    if (!name || !nickname || !password || !birth) {
      const err = new Error('Input all information');
      err.statusCode = 400;
      throw err;
    }
    // validateNickname(nickname);
    validatePassword(password);

    await createUser(name, nickname, password, birth);
    return res.status(201).json({ message: 'User Created' });
  } catch (err) {
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

module.exports = { signUp };
