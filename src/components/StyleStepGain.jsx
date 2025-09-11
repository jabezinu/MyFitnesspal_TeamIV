import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import calLogLogo from "../assets/img/calLogLogo.png";

const StyleStepGain = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { firstName, lastName, goal, barriers } = location.state || {};

  useEffect(() => {
    if (!firstName || !lastName || !goal) {
      navigate("/signup/user-info");
    }
  }, [firstName, lastName, goal, navigate]);

  const handleBack = () => {
    navigate("/signup/barriers-gain", {
      state: { firstName, lastName, goal, barriers },
    });
  };

  const handleNext = () => {
    navigate("/signup/activity", {
      state: { firstName, lastName, goal, barriers },
    });
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
        {/* Logo */}
        <div className="flex justify-start mb-4">
          <img src={calLogLogo} alt="CallogFit Logo" className="h-8" />
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center gap-2 mb-6">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <span
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i < 5 ? "bg-[#1D2D44]" : "bg-gray-300"
                }`}
              />
            ))}
        </div>

        
        <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">
          We understand. Life can sometimes make it hard to focus on your health
          goals.
        </h2>

        
        <p className="text-sm text-gray-600 mb-4 text-center">
          That’s why we’re here to help you navigate challenges and stay on
          track. We’ve guided countless people toward achieving their wellness
          dreams.
        </p>
        <p className="text-sm text-gray-600 mb-8 text-center">
          Let’s dive into the details so we can create your personalized plan.
        </p>

      
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

export default StyleStepGain;
