import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const MaintainConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { firstName, lastName, goal } = location.state || {};

  const steps = 4; // total steps in the signup flow
  const currentStep = 3; // this is step 3

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
          Great! You’ve chosen to maintain your weight.
        </h2>

        <p className="text-gray-700 mb-4 text-center">
          Maintaining your current weight is all about balance! By monitoring
          your daily habits and staying consistent, you can keep your weight
          steady and healthy.
        </p>

        <p className="text-gray-700 mb-6 text-center">
          Let's continue by identifying any challenges that may affect your
          goal.
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
              navigate("/signup/barriers-maintain", {
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

export default MaintainConfirmation;
