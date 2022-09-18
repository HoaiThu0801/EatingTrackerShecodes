const Food = require('../models/food.nutrition.model');
const APIFeatures = require('../utils/apiFeatures');

const createFood = async (foodBody) => {
    return await Food.create(foodBody);
}
const getFood = async (queryFood) => {
    let filter = {};
    const features = new APIFeatures(Food.find(filter), queryFood)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    let docs = await features.query;
    return docs;
}
module.exports = {
    createFood,
    getFood,
};