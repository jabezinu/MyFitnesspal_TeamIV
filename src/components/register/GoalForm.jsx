import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import calLogLogo from "../../assets/img/calLogLogo.png";

const GoalForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { firstName, lastName } = location.state || {};
  const [goal, setGoal] = useState("");

  const steps = 3;
  const currentStep = 2;

  useEffect(() => {
    if (!firstName || !lastName) navigate("/signup/user-info");
  }, [firstName, lastName, navigate]);

  const goals = ["Lose Weight", "Maintain Weight", "Gain Weight"];

  const handleNext = () => {
    if (!goal) return alert("Please select a goal.");

    if (goal === "Lose Weight") {
      navigate("/signup/goal-confirmation", {
        state: { firstName, lastName, goal },
      });
    } else if (goal === "Maintain Weight") {
      navigate("/signup/maintain-confirmation", {
        state: { firstName, lastName, goal },
      });
    } else if (goal === "Gain Weight") {
      navigate("/signup/gain-confirmation", {
        state: { firstName, lastName, goal },
      });
    }
  };

  const handleBack = () => navigate("/signup/user-info");

  return (
    <motion.div
      className="min-h-screen bg-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <nav className="w-full bg-[#1D2D44] px-6 py-2 flex items-center shadow-md">
        <img src={calLogLogo} alt="Logo" className="h-10 w-auto" />
      </nav>

      <div className="flex flex-col items-center justify-center px-4 py-10">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 mt-10">
          {/* Step Indicators */}
          <div className="flex justify-center gap-2 mb-6">
            {Array(steps)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i < currentStep ? "bg-[#1D2D44]" : "bg-gray-300"
                  }`}
                />
              ))}
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-2 text-center">
            What's your main goal?
          </h2>
          <p className="text-sm text-gray-600 mb-6 text-center">
            {firstName ? `Hi ${firstName}, ` : ""}choose your goal.
          </p>

          <div className="flex flex-col gap-4 mb-6">
            {goals.map((g) => (
              <motion.button
                key={g}
                onClick={() => setGoal(g)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-lg border font-medium transition ${
                  goal === g
                    ? "bg-[#1D2D44] text-white"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
              >
                {g}
              </motion.button>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleBack}
              className="flex-1 py-3 rounded-lg border border-[#1D2D44] text-[#1D2D44] font-semibold hover:bg-[#f0f0f0] transition"
            >
              BACK
            </button>
            <button
              onClick={handleNext}
              className="flex-1 py-3 rounded-lg bg-[#1D2D44] text-white font-semibold hover:opacity-90 transition"
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GoalForm;
