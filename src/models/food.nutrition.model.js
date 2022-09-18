const mongoose = require('mongoose');

const foodNutritionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'You must enter name'],
        unique: [true, 'Name is duplicated. Please try another name'],
    },
    kcal: {
        type: Number,
        required: [true, 'You must enter kcal'],
    },
    nutrients: {
        type: {
            protein: {
                type: Number,
                default: 0
            },
            carbohydrates: {
                type: Number,
                default: 0
            },
            fiber: {
                type: Number,
                default: 0
            },
            sugar: {
                type: Number,
                default: 0
            },
            fat: {
                type: Number,
                default: 0
            },
            saturated: {
                type: Number,
                default: 0
            }
        },
    },
    macros: {
        type: {
            carbohydrates: {
                type: Number,
                default: 0
            },
            fat: {
                type: Number,
                default: 0
            },
            protein: {
                type: Number,
                default: 0
            }
        }
    },
    image: {
        type: String,
    }
},
{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})
const FoodNutrition = mongoose.model('FoodNutrition', foodNutritionSchema);
module.exports = FoodNutrition;