import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    firstName,
    lastName,
    goal,
    activityLevel,
    gender,
    country,
    birthDate,
    heightFeet,
    heightInches,
    weightPounds,
    goalWeightPounds,
    bmr,
    dailyCalories,
    caloriesGoal,
    weeklyGoal,
  } = location.state || {};

  useEffect(() => {
    if (!firstName || !bmr) {
      navigate("/signup/user-info");
    }
  }, [firstName, bmr, navigate]);

  // Save user and authenticate
  const handleFinish = () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const newUser = {
      email: `${firstName?.toLowerCase() || "user"}@example.com`, // fallback email
      password: "123456", // ⚠️ demo password
      name: `${firstName || ""} ${lastName || ""}`.trim(),
      goal,
      activityLevel,
      gender,
      country,
      birthDate,
      height: { feet: heightFeet, inches: heightInches },
      weight: weightPounds,
      goalWeight: goalWeightPounds,
      bmr,
      dailyCalories,
      caloriesGoal,
      weeklyGoal, // ✅ now saving weeklyGoal properly
    };

    // Save to users list
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Set as current logged-in user
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    // Redirect to dashboard
    navigate("/dashboard");
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
        <h2 className="text-xl font-semibold text-gray-900 text-center mb-4">
          Your Personalized Calorie Report
        </h2>

        {/* Summary Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
          <p>
            <strong>Name:</strong> {firstName || "-"} {lastName || "-"}
          </p>
          <p>
            <strong>Gender:</strong> {gender || "-"}
          </p>
          <p>
            <strong>Country:</strong> {country || "-"}
          </p>
          <p>
            <strong>Date of Birth:</strong> {birthDate || "-"}
          </p>
          <p>
            <strong>Height:</strong> {heightFeet || "-"}' {heightInches || "-"}"
          </p>
          <p>
            <strong>Weight:</strong> {weightPounds || "-"} lbs
          </p>
          <p>
            <strong>Goal Weight:</strong> {goalWeightPounds || "-"} lbs
          </p>
          <p>
            <strong>Activity Level:</strong>{" "}
            <span className="text-[#1D2D44] font-semibold">
              {activityLevel || "-"}
            </span>
          </p>
          <p>
            <strong>Goal:</strong> {goal || "-"}
          </p>
          {weeklyGoal && (
            <p>
              <strong>Weekly Goal:</strong>{" "}
              <span className="text-[#FF6B6B] font-semibold">
                {weeklyGoal === "Maintain"
                  ? "Maintain Current Weight"
                  : `${weeklyGoal} lbs/week`}
              </span>
            </p>
          )}
        </div>

        {/* BMR */}
        <div className="bg-[#1D2D44] text-white rounded-lg p-6 text-center mb-4">
          <p className="text-lg font-semibold">BMR (Basal Metabolic Rate)</p>
          <p className="text-2xl font-bold">
            {bmr ? Math.round(bmr) : "-"} kcal/day
          </p>
        </div>

        {/* Calories Based on Goal */}
        <div className="bg-[#FF6B6B] text-white rounded-lg p-6 text-center mb-6">
          <p className="text-lg font-semibold">Calories Based on Your Goal</p>
          <p className="text-2xl font-bold">
            {caloriesGoal ? Math.round(caloriesGoal) : "-"} kcal/day
          </p>
        </div>

        {/* Maintenance Calories */}
        {dailyCalories && (
          <div className="bg-gray-200 text-gray-800 rounded-lg p-4 text-center mb-6">
            <p className="font-semibold">Maintenance Calories (TDEE)</p>
            <p className="text-lg">{Math.round(dailyCalories)} kcal/day</p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() =>
              navigate("/signup/personal-details", { state: location.state })
            }
            className="flex-1 py-3 border border-[#1D2D44] text-[#1D2D44] rounded-lg font-semibold hover:bg-[#f0f0f0] transition"
          >
            BACK
          </button>
          <button
            onClick={handleFinish}
            className="flex-1 py-3 bg-[#1D2D44] text-white rounded-lg font-semibold hover:opacity-90 transition"
          >
            FINISH
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultsPage;
