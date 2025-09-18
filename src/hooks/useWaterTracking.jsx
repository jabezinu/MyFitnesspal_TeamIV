import { useState, useEffect } from "react";

export const useWaterTracking = () => {
  const [waterIntake, setWaterIntake] = useState(0);
  const [waterGoal, setWaterGoal] = useState(8); // Default goal
  const [isGoalAchieved, setIsGoalAchieved] = useState(false);

  // Load from localStorage on component mount
  useEffect(() => {
    const savedIntake = localStorage.getItem("waterIntake");
    const savedGoal = localStorage.getItem("waterGoal");

    if (savedIntake) {
      const intake = parseInt(savedIntake);
      setWaterIntake(intake);
      setIsGoalAchieved(intake >= waterGoal);
    }
    if (savedGoal) setWaterGoal(parseInt(savedGoal));
  }, [waterGoal]);

  // Update goal achievement status when water intake changes
  useEffect(() => {
    setIsGoalAchieved(waterIntake >= waterGoal);
  }, [waterIntake, waterGoal]);

  // Reset water intake at midnight
  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const timeUntilMidnight = tomorrow - now;

    const resetTimer = setTimeout(() => {
      setWaterIntake(0);
      localStorage.setItem("waterIntake", "0");
      setIsGoalAchieved(false);
    }, timeUntilMidnight);

    return () => clearTimeout(resetTimer);
  }, []);

  const logWater = () => {
    if (waterIntake < waterGoal) {
      const newIntake = waterIntake + 1;
      setWaterIntake(newIntake);
      localStorage.setItem("waterIntake", newIntake.toString());
    }
  };

  const resetWater = () => {
    setWaterIntake(0);
    localStorage.setItem("waterIntake", "0");
    setIsGoalAchieved(false);
  };

  return {
    waterIntake,
    waterGoal,
    logWater,
    resetWater,
    isGoalAchieved,
  };
};
