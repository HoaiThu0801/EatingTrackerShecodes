const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'You must enter name'],
        unique: [true, 'Name is duplicated. Please try another name'],
    },
    consumedKcal: {
        type: String,
        required: [true, 'You must consumed kcal'],
    },
    description: {
        type: String,
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