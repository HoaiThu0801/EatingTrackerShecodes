const userRouter = require('./user.route');
const foodNutrition = require('./food.nutrition.route');

function route(app) {
  app.use('/api/v1/user', userRouter);
  app.use('/api/v1/food-nutrition', foodNutrition);
}
module.exports = route;
