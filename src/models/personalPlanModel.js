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
    }
})