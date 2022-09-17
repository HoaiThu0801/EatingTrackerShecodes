const express = require('express');

const authController = require('../controllers/auth.controller');

const userRouter = express.Router({ mergeParams: true });

userRouter.route('/signup').post(authController.signUpUser);
userRouter.route('/login').post(authController.loginUser);

module.exports = userRouter;
