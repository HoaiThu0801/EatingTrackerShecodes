exports.customFoodNutritionQuery = (req, res, next) => {
    const subObjectPatten = /\b(%)\b/g;
    if (req.query.name) {
        req.query.name = { $regex: req.query.name, $options: 'si' };
    }
    next();
}