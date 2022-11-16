const emailValidate = async (email) => {
  const regexp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;

  if (!regexp.test(email)) {
    const err = new Error('Invalid Email');
    err.statusCode = 400;
    throw err;
  }
};

const passwordValidate = async (password) => {
  const regexp =
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;

  if (!regexp.test(password)) {
    const err = new Error('Invalid Password');
    err.statusCode = 400;
    throw err;
  }
};

module.exports = { emailValidate, passwordValidate };
