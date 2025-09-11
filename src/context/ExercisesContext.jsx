import React, { createContext, useContext, useState } from "react";

// Create context
const ExercisesContext = createContext();

// Provider component
export const ExercisesProvider = ({ children }) => {
  const [exercises, setExercises] = useState({
    cardio: [],
    strength: [],
  });

  // Add exercise
  const addExercise = (type, exercise) => {
    setExercises((prev) => ({
      ...prev,
      [type]: [...prev[type], exercise],
    }));
  };

  // Remove exercise
  const removeExercise = (type, index) => {
    setExercises((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  // Get totals
  const getTotals = () => {
    const minutes = exercises.cardio.reduce(
      (sum, e) => sum + (e.minutes || 0),
      0
    );
    const calories = exercises.cardio.reduce(
      (sum, e) => sum + (e.calories || 0),
      0
    );
    // Optional: add strength totals if needed
    return { minutes, calories };
  };

  return (
    <ExercisesContext.Provider
      value={{ exercises, addExercise, removeExercise, getTotals }}
    >
      {children}
    </ExercisesContext.Provider>
  );
};

// Hook to use the context
export const useExercises = () => useContext(ExercisesContext);
