const mongoose = require('mongoose');
const PersonalPlan = require('./personalPlanModel');

const activityPlanSchema = new mongoose.Schema({
  personalPlan: {
  },
  kcalIn: {
      type: Number,
      default: 0
  },
  kcalOut: {
      type: Number,
      default: 0
  }, 
  totalKcal: {
    type: Number,
    default: 0
  },
  currentWatersCup: {
    type: Number,
    default: 0
  },
  remainingKcal: {
    type: Number,
    default: 0
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
},
{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
activityPlanSchema.pre('save',  async function (next){
    this.personalPlan = await PersonalPlan.findById(this.personalPlan, {totalKcal: 1, watersCup: 1});
    next();
})
const ActivityPlan = mongoose.model('ActivityPlan', activityPlanSchema);
module.exports = ActivityPlan;