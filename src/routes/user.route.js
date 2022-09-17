const express = require('express');

const authController = require('../controllers/auth.controller');

const userRouter = express.Router({ mergeParams: true });
const personalPlanRouter = require('./personal.plan.route');

userRouter.use('/personal-plan', personalPlanRouter)
userRouter.route('/signup').post(authController.signUpUser);
userRouter.route('/login').post(authController.loginUser);

module.exports = userRouter;
