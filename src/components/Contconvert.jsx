import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Contconvert = () => {
  const navigate = useNavigate();

  const [weightKg, setWeightKg] = useState("");
  const [heightMeters, setHeightMeters] = useState(""); // e.g., 1.55
  const [converted, setConverted] = useState(null);

  // Convert kg → lbs and meters → feet/inches
  const handleConvert = () => {
    if (!weightKg || !heightMeters) {
      alert("Please enter both weight and height.");
      return;
    }

    const weightLbs = parseFloat(weightKg) * 2.20462;
    const heightCm = parseFloat(heightMeters) * 100; // meters → cm
    const totalInches = heightCm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);

    setConverted({
      weightLbs: weightLbs.toFixed(1),
      feet,
      inches,
    });
  };

  // Back button — go to previous page in history
  const handleBack = () => {
    navigate(-1);
  };

  // Use converted values and navigate to PersonalDetailsForm
  const useValues = () => {
    if (!converted) return;
    navigate("/signup/personal-details", {
      state: {
        weightPounds: converted.weightLbs,
        heightFeet: converted.feet,
        heightInches: converted.inches,
      },
    });
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-50 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg p-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Convert Your Units
        </h2>

        {/* Weight Input */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Weight (kg)</label>
          <input
            type="number"
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
            placeholder="Enter weight in kg"
            className="w-full p-4 border rounded-xl focus:outline-none"
          />
        </div>

        {/* Height Input */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Height (meters)</label>
          <input
            type="number"
            step="0.01"
            value={heightMeters}
            onChange={(e) => setHeightMeters(e.target.value)}
            placeholder="Enter height in meters (e.g., 1.55)"
            className="w-full p-4 border rounded-xl focus:outline-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-center mt-6">
          <button
            onClick={handleConvert}
            className="flex-1 py-3 bg-[#1D2D44] text-white rounded-lg font-semibold hover:bg-[#152033] transition"
          >
            Convert
          </button>
          <button
            onClick={handleBack}
            className="flex-1 py-3 border border-[#1D2D44] text-[#1D2D44] rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Back
          </button>
        </div>

        {/* Conversion Result */}
        {converted && (
          <div className="mt-6 bg-gray-100 p-4 rounded-xl text-center space-y-2">
            <p>
              <strong>Weight:</strong> {converted.weightLbs} lbs
            </p>
            <p>
              <strong>Height:</strong> {converted.feet}' {converted.inches}"
            </p>
            <button
              onClick={useValues}
              className="mt-2 px-4 py-2 bg-[#1D2D44] text-white rounded-lg font-semibold hover:bg-[#152033] transition"
            >
              Use These Values
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Contconvert;
