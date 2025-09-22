import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import Signup from "./Signup";
import UserInfoForm from "./UserInfoForm";
import GoalForm from "./GoalForm";
import GoalConfirmation from "./GoalConfirmation";
import MaintainConfirmation from "./MaintainConfirmation";
import GainConfirmation from "./GainConfirmation";
import BarriersForm from "./BarriersForm";
import BarriersFormMaintain from "./BarriersFormMaintain";
import BarriersFormGain from "./BarriersFormGain";
import StyleStep from "./StyleStep";
import StyleStepMaintain from "./StyleStepMaintain";
import StyleStepGain from "./StyleStepGain";
import ActivityLevelForm from "./ActivityLevelForm";
import PersonalDetailsForm from "./PersonalDetailsForm";
import LossW from "./LossW";
import Maintain from "./Maintain";
import GainW from "./GainW";
import SignupFinalForm from "./SignupFinalForm";

const CreateUsername = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [suggestedUsername, setSuggestedUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [calculatedMetrics, setCalculatedMetrics] = useState(null);

  // Get user data from location.state when component mounts
  useEffect(() => {
    if (location.state) {
      setUserData(location.state);

      if (location.state.firstName) {
        setIsLoading(true);
        const firstName = location.state.firstName;
        const lastName = location.state.lastName || "";

        // Create base username from first and last name
        const baseUsername = `${firstName}${lastName ? lastName.charAt(0) : ""}`
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]/g, "");

        // Add some random numbers to make it unique
        const randomNum = Math.floor(Math.random() * 1000);
        const suggestion = `${baseUsername}${randomNum}`;

        setSuggestedUsername(suggestion);
        setIsLoading(false);
      }
    }
  }, [location.state]);

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
  const calculateBMR = (weight, height, age, gender) => {
    if (weight <= 0 || height <= 0 || age <= 0) return 0;

    if (gender === "male") {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161;
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
  const calculateCalorieGoal = (tdee, currentWeight, goalWeight) => {
    if (goalWeight <= 0 || currentWeight <= 0) return Math.round(tdee);

    const weightDifference = currentWeight - goalWeight;

    if (Math.abs(weightDifference) < 0.5) {
      // Maintain weight
      return Math.round(tdee);
    } else if (weightDifference > 0) {
      // Lose weight (deficit of 500 calories/day ≈ 0.5kg/week)
      return Math.round(tdee - 500);
    } else {
      // Gain weight (surplus of 500 calories/day ≈ 0.5kg/week)
      return Math.round(tdee + 500);
    }
  };

  // Calculate all metrics when userData changes
  useEffect(() => {
    if (userData) {
      const {
        goal,
        activityLevel,
        gender,
        birthDate,
        heightFeet,
        heightInches,
        weightPounds,
        goalWeightPounds,
      } = userData;

      // Convert height from feet/inches to centimeters
      const totalInches =
        (parseFloat(heightFeet) || 0) * 12 + (parseFloat(heightInches) || 0);
      const heightCm = totalInches * 2.54;

      // Convert weight from pounds to kilograms
      const weightKg = (parseFloat(weightPounds) || 0) * 0.45359237;
      const goalWeightKg = (parseFloat(goalWeightPounds) || 0) * 0.45359237;

      // Calculate age
      const age = calculateAge(birthDate);

      // Map activity level to match the calculation function
      const activityMap = {
        Sedentary: "sedentary",
        "Lightly Active": "light",
        "Moderately Active": "moderate",
        "Very Active": "active",
        "Extremely Active": "very_active",
      };

      const mappedActivityLevel = activityMap[activityLevel] || "moderate";
      const mappedGender = gender?.toLowerCase() || "male";

      // Calculate health metrics
      const bmr = calculateBMR(weightKg, heightCm, age, mappedGender);
      const tdee = calculateTDEE(bmr, mappedActivityLevel);
      const caloriesGoal = calculateCalorieGoal(tdee, weightKg, goalWeightKg);

      setCalculatedMetrics({
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        caloriesGoal,
        weightKg: parseFloat(weightKg.toFixed(1)),
        heightCm: parseFloat(heightCm.toFixed(1)),
        age,
      });
    }
  }, [userData]);

  const validateUsername = (username) => {
    if (username.length < 3) {
      return "Username must be at least 3 characters long.";
    }
    if (username.length > 20) {
      return "Username cannot be longer than 20 characters.";
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return "Username can only contain letters, numbers, and underscores.";
    }
    return "";
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);

    // Validate as user types
    const error = validateUsername(value);
    setUsernameError(error);
  };

  const handleUseSuggestion = () => {
    setUsername(suggestedUsername);
    setUsernameError(validateUsername(suggestedUsername));
  };

  const handleFinish = () => {
    const error = validateUsername(username);
    if (error) {
      setUsernameError(error);
      return;
    }

    if (!username.trim()) {
      setUsernameError("Please create a username before continuing.");
      return;
    }

    if (!userData) {
      setUsernameError("User data is missing. Please go back and try again.");
      return;
    }

    // Extract data from userData
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
    } = userData;

    // Convert height from feet/inches to centimeters
    const totalInches =
      (parseFloat(heightFeet) || 0) * 12 + (parseFloat(heightInches) || 0);
    const heightCm = totalInches * 2.54;

    // Convert weight from pounds to kilograms
    const weightKg = (parseFloat(weightPounds) || 0) * 0.45359237;
    const goalWeightKg = (parseFloat(goalWeightPounds) || 0) * 0.45359237;

    // Calculate age
    const age = calculateAge(birthDate);

    // Map activity level to match the calculation function
    const activityMap = {
      Sedentary: "sedentary",
      "Lightly Active": "light",
      "Moderately Active": "moderate",
      "Very Active": "active",
      "Extremely Active": "very_active",
    };

    const mappedActivityLevel = activityMap[activityLevel] || "moderate";
    const mappedGender = gender?.toLowerCase() || "male";

    // Calculate health metrics
    const bmr = calculateBMR(weightKg, heightCm, age, mappedGender);
    const tdee = calculateTDEE(bmr, mappedActivityLevel);
    const caloriesGoal = calculateCalorieGoal(tdee, weightKg, goalWeightKg);

    // Create user object matching the EditProfilePage structure
    const newUser = {
      first_name: firstName || "",
      last_name: lastName || "",
      username: username,
      profile: {
        sex: mappedGender,
        dob: birthDate || "",
        country: country || "",
        height_cm: parseFloat(heightCm.toFixed(1)),
        current_weight_kg: parseFloat(weightKg.toFixed(1)),
        goal_weight_kg: parseFloat(goalWeightKg.toFixed(1)),
        activity_level: mappedActivityLevel,
        daily_calorie_goal: caloriesGoal,
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        // Additional fields that might be needed
        email_opt_in: 1,
        timezone: "UTC",
        water_goal_ml: 2000,
        page_title: "",
        about_me: "",
        why_get_in_shape: "",
        inspirations: "",
      },
    };

    // Save to localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    // Navigate to dashboard
    navigate("/dashboard");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center px-4 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {/* Header with Logo */}
      <div className="w-full max-w-md mb-6 text-center">
        <h1 className="text-3xl font-bold text-[#1D2D44]">CalLogFit</h1>
        <p className="text-gray-600 mt-2">Your fitness journey starts here</p>
      </div>

      {/* Form Container */}
      <motion.div
        className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Create a username
        </h2>

        {/* Username Input */}
        <div className="mb-6">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Create a username
          </label>

          <input
            id="username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D2D44] focus:border-transparent transition ${
              usernameError ? "border-red-500" : "border-gray-300"
            }`}
            placeholder={
              isLoading ? "Generating suggestion..." : suggestedUsername
            }
          />

          {usernameError && (
            <p className="mt-2 text-sm text-red-600">{usernameError}</p>
          )}

          <p className="mt-2 text-sm text-gray-500">
            Username must be 3-20 characters, containing only letters, numbers,
            and underscores.
          </p>

          {/* Suggestion Button */}
          {suggestedUsername && !isLoading && (
            <div className="mt-3">
              <button
                type="button"
                onClick={handleUseSuggestion}
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Use suggested: {suggestedUsername}
              </button>
            </div>
          )}
        </div>

        {/* User Data Preview */}
        {userData && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-2">
              Your Profile Summary
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-600">Name:</span>{" "}
                {userData.firstName} {userData.lastName}
              </div>
              <div>
                <span className="text-gray-600">Goal:</span> {userData.goal}
              </div>
              <div>
                <span className="text-gray-600">Activity:</span>{" "}
                {userData.activityLevel}
              </div>
            </div>
          </div>
        )}

        {/* Calculated Metrics Preview */}
        {calculatedMetrics && (
          <div className="mb-6 p-4 bg-green-50 rounded-lg">
            <h3 className="font-medium text-green-800 mb-2">
              Your Calculated Metrics
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-600">BMR:</span>{" "}
                {calculatedMetrics.bmr} kcal/day
              </div>
              <div>
                <span className="text-gray-600">TDEE:</span>{" "}
                {calculatedMetrics.tdee} kcal/day
              </div>
              <div>
                <span className="text-gray-600">Calorie Goal:</span>{" "}
                {calculatedMetrics.caloriesGoal} kcal/day
              </div>
              <div>
                <span className="text-gray-600">Weight:</span>{" "}
                {calculatedMetrics.weightKg} kg
              </div>
              <div>
                <span className="text-gray-600">Height:</span>{" "}
                {calculatedMetrics.heightCm} cm
              </div>
              <div>
                <span className="text-gray-600">Age:</span>{" "}
                {calculatedMetrics.age} years
              </div>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleBack}
            className="flex-1 py-3 rounded-lg border border-[#1D2D44] text-[#1D2D44] font-semibold hover:bg-gray-50 transition flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            BACK
          </button>
          <button
            onClick={handleFinish}
            disabled={!!usernameError || !username.trim()}
            className="flex-1 py-3 rounded-lg bg-[#1D2D44] text-white font-semibold hover:bg-[#152033] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            COMPLETE SETUP
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </button>
        </div>
      </motion.div>

      {/* Footer Note */}
      <p className="text-sm text-gray-500 mt-6 text-center max-w-md">
        Your username is how you'll be identified in the app. <br />
        You can always change it later in your profile settings.
      </p>
    </motion.div>
  );
};

export default CreateUsername;
