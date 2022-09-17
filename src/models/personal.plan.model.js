const mongoose = require('mongoose');

const personalPlanSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'You must enter username'],
        unique: [true, 'Username is duplicated. Please try another username'],
        trim: true,
        minlength: 8,
        maxlength: 32,
      },
    DOB: {
        type: Date,
    },
    gender: {
        type: String,
        required: [true, 'You must enter gender'],
        enum: {
            values: ['Male', 'Female', 'Other'],
            message: 'Gender includes: Male, Female, Other',
          }, 
    },
    activityFrequency: {
        type: String,
        default: 'Often',
        enum: {
            values: ['Rare', 'Often', 'Usually'],
            message: 'Activity frequency includes: Rare, Often, Usually',
          }, 
    },
    target: {
        type: String,
        default: 'Keep',
        enum: {
            values: ['Loose', 'Keep', 'Gain'],
            message: 'Activity frequency includes: Loose, Keep, Gain weight',
          }, 
    },
    initialHeight: {
        type: Number, 
        required: [true, 'You must enter height'],
    },
    initialWeight: {
        type: Number, 
        required: [true, 'You must enter weight'],
    },
    currentHeight: {
        type: Number, 
    },
    currentWeight: {
        type: Number, 
    },
    watersCup: {
        type: Number,
        default: 0
    },
    totalKcal: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    }
},
{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})
const PersonalPlan = mongoose.model('PersonalPlan', personalPlanSchema);
module.exports = PersonalPlan;