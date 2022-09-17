const PersonalPlan = require('../models/personal.plan.model');

const createPersonalPlan = async(personalPlanBody, userId) => {
    return await PersonalPlan.create({
      username: personalPlanBody.username,
      age: personalPlanBody.age,
      gender: personalPlanBody.gender,
      activityFrequency: personalPlanBody.activityFrequency,
      target: personalPlanBody.target,
      initialHeight: personalPlanBody.initialHeight,
      initialWeight: personalPlanBody.initialWeight,
      currentHeight: personalPlanBody.initialHeight,
      currentWeight: personalPlanBody.initialWeight,
      user: userId,
      totalKcal: await calculateTDEE(personalPlanBody.initialWeight, personalPlanBody.initialHeight, 
        personalPlanBody.age, personalPlanBody.gender, personalPlanBody.activityFrequency),
      waterCups: await calculateWaterCups(personalPlanBody.initialWeight),
    });
}
const calculateWaterCups = async weight => Math.round(weight*2*0.5*0.03*4);
const calculatetBMR = async (weight, height, age, gender) => {
  return gender == 'Female' ? 9.247*weight + 3.098*height - 4.330*age + 447.593 :  13.397*weight + 4.799*height - 5.677*age + 88.362;
}
const calculateTDEE = async (weight, height, age, gender, activityFrequency) => {
  activityLevel = {
    Rare : 1.2,
    Often: 1.375,
    Usually: 1.55
  }
  return Math.round(activityLevel[activityFrequency]* await calculatetBMR(weight, height, age, gender), 2);
}
module.exports = {
  createPersonalPlan,
  };