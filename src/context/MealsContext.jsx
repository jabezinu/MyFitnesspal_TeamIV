import React, { createContext, useContext, useState } from "react";

const MealsContext = createContext();

export const MealsProvider = ({ children }) => {
  const [meals, setMeals] = useState({
    Breakfast: [],
    Lunch: [],
    Dinner: [],
  });

  const [dailyGoal, setDailyGoal] = useState({
    calories: 2000,
    carbs: 300,
    fat: 70,
    protein: 100,
    sodium: 2300,
    sugar: 50,
  });

  return (
    <MealsContext.Provider value={{ meals, setMeals, dailyGoal }}>
      {children}
    </MealsContext.Provider>
  );
};

export const useMeals = () => useContext(MealsContext);