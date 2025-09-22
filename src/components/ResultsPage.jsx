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
    weeklyGoal,
  } = location.state || {};

  useEffect(() => {
    if (!firstName) {
      navigate("/signup/user-info");
    }
  }, [firstName, navigate]);

  // Calculate age from birthDate
  const calculateAge = (dob) => {
    if (!dob) return 0;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  // Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
  const calculateBMR = (weightKg, heightCm, age, gender) => {
    if (weightKg <= 0 || heightCm <= 0 || age <= 0) return 0;

    // Mifflin-St Jeor Equation
    if (gender === "male") {
      return 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else {
      return 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }
  };

  // Calculate TDEE (Total Daily Energy Expenditure) based on activity level
  const calculateTDEE = (bmr, activityLevel) => {
    const activityMultipliers = {
      sedentary: 1.2, // Little to no exercise
      light: 1.375, // Light exercise 1-3 days/week
      moderate: 1.55, // Moderate exercise 3-5 days/week
      active: 1.725, // Hard exercise 6-7 days/week
      very_active: 1.9, // Very hard exercise, physical job
    };

    return bmr * (activityMultipliers[activityLevel] || 1.55);
  };

  // Calculate suggested calorie goal based on weight goal
  const calculateCalorieGoal = (
    tdee,
    currentWeightKg,
    goalWeightKg,
    weeklyGoal
  ) => {
    if (goalWeightKg <= 0 || currentWeightKg <= 0) return Math.round(tdee);

    const weightDifference = currentWeightKg - goalWeightKg;

    // If maintaining weight or very small difference
    if (Math.abs(weightDifference) < 0.5 || weeklyGoal === "Maintain") {
      return Math.round(tdee);
    }
    // If losing weight
    else if (weightDifference > 0) {
      // Calculate deficit based on weekly goal
      let deficit;
      switch (weeklyGoal) {
        case "0.5":
          deficit = 500;
          break; // 0.5 lb/week ≈ 500 cal/day deficit
        case "1":
          deficit = 1000;
          break; // 1 lb/week ≈ 1000 cal/day deficit
        case "1.5":
          deficit = 1500;
          break; // 1.5 lb/week ≈ 1500 cal/day deficit
        case "2":
          deficit = 2000;
          break; // 2 lb/week ≈ 2000 cal/day deficit
        default:
          deficit = 500;
      }
      return Math.max(Math.round(tdee - deficit), 1200); // Minimum 1200 calories for safety
    }
    // If gaining weight
    else {
      // Calculate surplus based on weekly goal
      let surplus;
      switch (weeklyGoal) {
        case "0.5":
          surplus = 500;
          break; // 0.5 lb/week ≈ 500 cal/day surplus

        case "1":
          surplus = 1000;
          break; // 1 lb/week ≈ 1000 cal/day surplus
        case "1.5":
          surplus = 1500;
          break; // 1.5 lb/week ≈ 1500 cal/day surplus
        case "2":
          surplus = 2000;
          break; // 2 lb/week ≈ 2000 cal/day surplus
        default:
          surplus = 500;
      }
      return Math.round(tdee + surplus);
    }
  };

  // Convert height from feet/inches to centimeters
  const heightCm =
    ((parseFloat(heightFeet) || 0) * 12 + (parseFloat(heightInches) || 0)) *
    2.54;

  // Convert weight from pounds to kilograms
  const weightKg = (parseFloat(weightPounds) || 0) * 0.453592;
  const goalWeightKg = (parseFloat(goalWeightPounds) || 0) * 0.453592;

  // Calculate age
  const age = calculateAge(birthDate);

  // Map activity level to match the edit profile options
  const activityMap = {
    Sedentary: "sedentary",
    "Lightly Active": "light",
    "Moderately Active": "moderate",
    "Very Active": "active",
    "Extremely Active": "very_active",
  };

  const mappedActivityLevel = activityMap[activityLevel] || "moderate";

  // Calculate health metrics
  const bmr = calculateBMR(
    weightKg,
    heightCm,
    age,
    gender?.toLowerCase() || "male"
  );
  const tdee = calculateTDEE(bmr, mappedActivityLevel);
  const caloriesGoal = calculateCalorieGoal(
    tdee,
    weightKg,
    goalWeightKg,
    weeklyGoal
  );

  // Save user and authenticate
  const handleFinish = () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Create user object compatible with EditProfilePage
    const newUser = {
      email: `${firstName?.toLowerCase() || "user"}@example.com`,
      password: "123456", // Demo password
      first_name: firstName || "",
      last_name: lastName || "",
      username: `${firstName?.toLowerCase() || "user"}_${
        lastName?.toLowerCase() || "name"
      }`,
      profile: {
        sex: gender?.toLowerCase() || "male",
        dob: birthDate || "",
        country: country || "",
        region: "",
        city: "",
        postal_code: "",
        height_cm: parseFloat(heightCm.toFixed(1)),
        current_weight_kg: parseFloat(weightKg.toFixed(1)),
        goal_weight_kg: parseFloat(goalWeightKg.toFixed(1)),
        activity_level: mappedActivityLevel,
        email_opt_in: 1,
        timezone: "UTC",
        water_goal_ml: 2000,
        page_title: "",
        about_me: "",
        why_get_in_shape: "",
        inspirations: "",
        daily_calorie_goal: Math.round(caloriesGoal),
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
      },
    };

    // Save to users list
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Set as current logged-in user (this is what EditProfilePage expects)
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    // Also save simplified profile data for Layout component
    const profileData = {
      name: `${firstName || ""} ${lastName || ""}`.trim(),
      gender: gender || "",
      age: age.toString(),
      heightFt: heightFeet || "",
      heightIn: heightInches || "",
      weightLbs: weightPounds || "",
      photo: null,
    };

    localStorage.setItem("userProfile", JSON.stringify(profileData));

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
            <strong>Age:</strong> {age || "-"} years
          </p>
          <p>
            <strong>Height:</strong> {heightFeet || "-"}' {heightInches || "-"}"
            ({heightCm.toFixed(1)} cm)
          </p>
          <p>
            <strong>Weight:</strong> {weightPounds || "-"} lbs (
            {weightKg.toFixed(1)} kg)
          </p>
          <p>
            <strong>Goal Weight:</strong> {goalWeightPounds || "-"} lbs (
            {goalWeightKg.toFixed(1)} kg)
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
          <p className="text-2xl font-bold">{Math.round(bmr)} kcal/day</p>
          <p className="text-sm mt-1">Calories your body needs at rest</p>
        </div>

        {/* TDEE */}
        <div className="bg-gray-200 text-gray-800 rounded-lg p-4 text-center mb-4">
          <p className="font-semibold">Maintenance Calories (TDEE)</p>
          <p className="text-lg">{Math.round(tdee)} kcal/day</p>
          <p className="text-sm mt-1">Calories to maintain current weight</p>
        </div>

        {/* Calories Based on Goal */}
        <div className="bg-[#FF6B6B] text-white rounded-lg p-6 text-center mb-6">
          <p className="text-lg font-semibold">Recommended Daily Calories</p>
          <p className="text-2xl font-bold">
            {Math.round(caloriesGoal)} kcal/day
          </p>
          <p className="text-sm mt-1">To reach your goal weight</p>
        </div>

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





