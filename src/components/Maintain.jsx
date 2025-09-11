import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Maintain = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNext = () => {
    navigate("/signup/results", {
      state: { ...location.state, weeklyGoal: "Maintain" },
    });
  };

  const handleBack = () => {
    navigate("/signup/personal-details", { state: { ...location.state } });
  };

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
          Maintain Your Current Weight
        </h2>
        <p className="text-center text-gray-700 mb-6">
          To maintain your weight, focus on balanced meals, regular physical
          activity, and monitor your calories to match your daily needs.
        </p>
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

export default Maintain;
