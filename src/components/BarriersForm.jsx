import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const BarriersForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { firstName, lastName, goal } = location.state || {};
  const [selectedBarriers, setSelectedBarriers] = useState([]);

  const barriers = [
    "Struggled with food cravings",
    "Found the plan too difficult to follow",
    "Limited time to stick to the routine",
    "Challenges from social events and gatherings",
  ];

  useEffect(() => {
    if (!firstName || !lastName || !goal) {
      navigate("/signup/user-info");
    }
  }, [firstName, lastName, goal, navigate]);

  const toggleBarrier = (barrier) => {
    setSelectedBarriers((prev) =>
      prev.includes(barrier)
        ? prev.filter((b) => b !== barrier)
        : [...prev, barrier]
    );
  };

  const handleNext = () => {
    navigate("/signup/style", {
      state: { firstName, lastName, goal, barriers: selectedBarriers },
    });
  };

  const handleBack = () => {
    navigate("/signup/goal-confirmation", {
      state: { firstName, lastName, goal },
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
        <div className="flex justify-center gap-2 mb-6">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <span
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i < 4 ? "bg-[#1D2D44]" : "bg-gray-300"
                }`}
              />
            ))}
        </div>

        <h2 className="text-lg font-semibold text-gray-900 mb-2 text-center">
          What challenges have made reaching your goal harder?
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Select all that apply.
        </p>

        <div className="flex flex-col gap-3 mb-6">
          {barriers.map((barrier) => (
            <button
              key={barrier}
              type="button"
              onClick={() => toggleBarrier(barrier)}
              className={`w-full text-left p-3 rounded-lg border font-medium transition ${
                selectedBarriers.includes(barrier)
                  ? "bg-[#1D2D44] text-white"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              {barrier}
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

export default BarriersForm;
