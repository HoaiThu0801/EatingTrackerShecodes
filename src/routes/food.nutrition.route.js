const express = require('express');

const foodNutritionController = require('./../controllers/food.nutrition.controller');
const foodNutritionMiddleware = require('./../middlewares/food.nutrition.midleware');
const foodNutritionRouter = express.Router({ mergeParams: true });

foodNutritionRouter.route('/').post(foodNutritionController.createFoodNutrition);
foodNutritionRouter.route('/').get(foodNutritionMiddleware.customFoodNutritionQuery, foodNutritionController.getFoodNutrition);
module.exports = foodNutritionRouter;
