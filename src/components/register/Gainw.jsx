import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const GainW = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [weeklyGoal, setWeeklyGoal] = useState("");

  const handleNext = () => {
    if (!weeklyGoal) return;
    // Updated to use the correct route path
    navigate("/signup/signup-final-form", {
      state: { ...location.state, weeklyGoal },
    });
  };

  const handleBack = () => {
    navigate("/signup/personal-details", {
      state: { ...location.state },
    });
  };

  const goals = [
    { label: "0.5 lbs/week", value: 0.5 },
    { label: "1 lbs/week", value: 1 },
    { label: "1.5 lbs/week", value: 1.5 },
    { label: "2 lbs/week", value: 2 },
  ];

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-50 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-3xl shadow-xl w-full max-w-2xl p-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#1D2D44]">
          What is your weekly weight gain goal?
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {goals.map((goal) => (
            <motion.div
              key={goal.value}
              onClick={() => setWeeklyGoal(goal.value)}
              className={`cursor-pointer p-5 rounded-xl shadow-md border transition-all ${
                weeklyGoal === goal.value
                  ? "bg-[#1D2D44] text-white border-[#1D2D44]"
                  : "bg-white border-gray-200 hover:shadow-lg"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {goal.label}
            </motion.div>
          ))}
        </div>

        <div className="flex gap-4 justify-center mt-8">
          <button
            onClick={handleBack}
            className="flex-1 py-3 border border-[#1D2D44] text-[#1D2D44] rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            BACK
          </button>
          <button
            onClick={handleNext}
            className="flex-1 py-3 bg-[#1D2D44] text-white rounded-lg font-semibold hover:bg-[#152033] transition"
          >
            NEXT
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GainW;
