const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const foodService = require('../services/food.nutrition.service');

class foodController{
    createFoodNutrition = catchAsync(async (req, res, next) => {
        const foodNutrion = await foodService.createFood(req.body);
        return res.status(201).json({
            status: 'success',
            data: {
              FoodNutrion: foodNutrion, 
            },
        });
    })
    getFoodNutrition = catchAsync(async(req, res, next) => {
        const foodNutritions = await foodService.getFood(req.query);
        return res.status(200).json({
            status: 'success',
            data: {
                foodNutritions: foodNutritions, 
            },
        });
    })
}
module.exports = new foodController();