import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const GoalConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get user data from GoalForm
  const { firstName, lastName, goal } = location.state || {};

  const steps = 4; // update total steps if BarriersForm is step 4
  const currentStep = 3; // this is still step 3

  useEffect(() => {
    if (!firstName || !lastName || !goal) {
      navigate("/signup/user-info"); // fallback if no data
    }
  }, [firstName, lastName, goal, navigate]);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-8">
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

        <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
          Great! You’ve just taken a big step on your journey.
        </h2>

        <p className="text-gray-700 mb-4 text-center">
          Did you know that tracking your food is a scientifically proven method
          to being successful? It’s called “self-monitoring” and the more
          consistent you are, the more likely you are to hit your goals.
        </p>

        <p className="text-gray-700 mb-6 text-center">
          Now, let’s talk about your goal to {goal.toLowerCase()}.
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() =>
              navigate("/signup/goal", { state: { firstName, lastName, goal } })
            }
            className="flex-1 py-3 border border-[#1D2D44] text-[#1D2D44] rounded-lg font-semibold hover:bg-[#f0f0f0] transition"
          >
            BACK
          </button>
          <button
            onClick={() =>
              navigate("/signup/barriers", {
                state: { firstName, lastName, goal },
              })
            }
            className="flex-1 py-3 bg-[#1D2D44] text-white rounded-lg font-semibold hover:opacity-90 transition"
          >
            NEXT
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default GoalConfirmation;
