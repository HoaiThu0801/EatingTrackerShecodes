const express = require('express');

const personalPlanController = require('./../controllers/personal.plan.controller')
const authController = require('./../controllers/auth.controller')
const personalControllerRouter = express.Router({ mergeParams: true });

personalControllerRouter.route('/').post(authController.protect, personalPlanController.createPersonalPlan);
personalControllerRouter.route('/:idPersonalPlan').get(authController.protect,personalPlanController.getPersonalPlan);
personalControllerRouter.route('/').get(authController.protect, personalPlanController.getPersonalPlanUserId)
module.exports = personalControllerRouter;
