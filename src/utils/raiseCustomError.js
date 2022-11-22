const raiseCustomError = (message, statusCode) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  throw err;
};

module.exports = { raiseCustomError };
