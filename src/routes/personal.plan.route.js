const express = require('express');

const personalPlanController = require('./../controllers/personal.plan.controller')
const authController = require('./../controllers/auth.controller')
const personalControllerRouter = express.Router({ mergeParams: true });

personalControllerRouter.route('/').post(authController.protect, personalPlanController.createPersonalPlan);

module.exports = personalControllerRouter;
