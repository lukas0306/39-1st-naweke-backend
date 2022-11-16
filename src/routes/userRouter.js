const express = require('express');

const userController = require('../controlloers/userController');

const userRouter = express.Router();

userRouter.post('/signup', userController.signUp);

module.exports = { userRouter };
