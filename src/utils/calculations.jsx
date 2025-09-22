// utils/calculations.js

// Calculate BMR (Basal Metabolic Rate)
export const calculateBMR = (weight, height, age, gender) => {
  weight = parseFloat(weight);
  height = parseFloat(height);
  age = parseInt(age);
  
  if (!weight || !height || !age || !gender) return 0;
  
  // Mifflin-St Jeor Equation
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
};

// Calculate TDEE (Total Daily Energy Expenditure)
export const calculateTDEE = (bmr, activityLevel) => {
  bmr = parseFloat(bmr);
  if (!bmr) return 0;
  
  const activityMultipliers = {
    sedentary: 1.2,      // Little to no exercise
    light: 1.375,        // Light exercise 1-3 days/week
    moderate: 1.55,      // Moderate exercise 3-5 days/week
    active: 1.725,       // Hard exercise 6-7 days/week
    very_active: 1.9     // Very hard exercise & physical job
  };
  
  return bmr * (activityMultipliers[activityLevel] || 1.2);
};

// Calculate calorie goal based on weight goal
export const calculateCalorieGoal = (tdee, weeklyGoal) => {
  tdee = parseFloat(tdee);
  if (!tdee) return 0;
  
  const weeklyCalorieAdjustments = {
    "Lose 2 lbs": -1000,  // -1000 calories per day for 2 lbs/week loss
    "Lose 1.5 lbs": -750, // -750 calories per day for 1.5 lbs/week loss
    "Lose 1 lbs": -500,   // -500 calories per day for 1 lb/week loss
    "Lose 0.5 lbs": -250, // -250 calories per day for 0.5 lb/week loss
    "Maintain": 0,        // Maintain weight
    "Gain 0.5 lbs": 250,  // +250 calories per day for 0.5 lb/week gain
    "Gain 1 lbs": 500,    // +500 calories per day for 1 lb/week gain
    "Gain 1.5 lbs": 750,  // +750 calories per day for 1.5 lb/week gain
    "Gain 2 lbs": 1000    // +1000 calories per day for 2 lb/week gain
  };
  
  return tdee + (weeklyCalorieAdjustments[weeklyGoal] || 0);
};