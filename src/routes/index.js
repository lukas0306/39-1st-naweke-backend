const express = require('express');

const { userRouter } = require('./userRouter');

const routes = express.Router();

routes.use('/users', userRouter);

module.exports = { routes };
