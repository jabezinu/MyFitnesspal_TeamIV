import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const ActivityLevelForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { firstName, lastName, goal, barriers } = location.state || {};

  const [activity, setActivity] = useState("");

  useEffect(() => {
    if (!firstName || !lastName || !goal) navigate("/signup/user-info");
  }, [firstName, lastName, goal, navigate]);

  const levels = [
    "Sedentary", // little or no exercise
    "Lightly Active", // exercise 1–3 days/week
    "Moderately Active", // exercise 3–5 days/week
    "Very Active", // exercise 6–7 days/week
    "Super Active", // hard exercise or physical job
  ];

  const handleNext = () => {
    if (!activity) return alert("Please select your activity level.");

    navigate("/signup/personal-details", {
      state: { firstName, lastName, goal, barriers, activityLevel: activity },
    });
  };

  const handleBack = () => {
    if (goal === "Gain Weight") {
      navigate("/signup/style-gain", {
        state: { firstName, lastName, goal, barriers },
      });
    } else if (goal === "Lose Weight") {
      navigate("/signup/style", {
        state: { firstName, lastName, goal, barriers },
      });
    } else {
      navigate("/signup/style-maintain", {
        state: { firstName, lastName, goal, barriers },
      });
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-100 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">
          Select Your Activity Level
        </h2>

        <div className="flex flex-col gap-4 mb-6">
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => setActivity(level)}
              className={`p-4 rounded-lg border font-medium transition ${
                activity === level
                  ? "bg-[#1D2D44] text-white"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={handleBack}
            className="flex-1 py-3 border border-[#1D2D44] text-[#1D2D44] rounded-lg font-semibold hover:bg-[#f0f0f0] transition"
          >
            BACK
          </button>
          <button
            onClick={handleNext}
            className="flex-1 py-3 bg-[#1D2D44] text-white rounded-lg font-semibold hover:opacity-90 transition"
          >
            NEXT
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityLevelForm;
