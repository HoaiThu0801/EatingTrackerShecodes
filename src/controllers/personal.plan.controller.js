const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const personalPlanService = require('./../services/personal.plan.service')

class personalPlanController{
    createPersonalPlan = catchAsync(async (req, res, next) => {
        const personalPlan = await personalPlanService.createPersonalPlan(req.body, req.user.id);
        return res.status(201).json({
          status: 'success',
          data: {
            PersonalPlan: personalPlan, 
          },
        });
      });
}
module.exports = new personalPlanController();