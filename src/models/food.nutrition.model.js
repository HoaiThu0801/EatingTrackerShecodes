const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'You must enter name'],
        unique: [true, 'Name is duplicated. Please try another name'],
    },
    kcal: {
        type: String,
        required: [true, 'You must enter kcal'],
    },
    nutrients: {
        type: {
            protein: Number,
            carbohydrates: Number,
            fiber: Number,
            sugar: Number,
            fat: Number,
            saturated: Number
        },
    },
    macros: {
        type: {
            carbohydrates: Number,
            fat: Number,
            protein: Number
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
const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;