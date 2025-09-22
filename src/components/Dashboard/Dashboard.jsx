import { useContext, useEffect, useState } from "react";
import {
  FiHome,
  FiActivity,
  FiBarChart2,
  FiCoffee,
  FiBell,
  FiLogOut,
} from "react-icons/fi";
import { GiFire } from "react-icons/gi";
import { FaRunning, FaGlassWhiskey } from "react-icons/fa";
import { MdOutlineFitnessCenter } from "react-icons/md";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ProfileContext } from "../../context/ProfileContext";
import { useWaterTracking } from "../../hooks/useWaterTracking";

import food1 from "../../assets/img/food1.png";
import food55 from "../../assets/img/food55.png";
import im3 from "../../assets/img/im3.png";
import im4 from "../../assets/img/im4.png";
import profile2 from "../../assets/img/profile2.png";
import profile3 from "../../assets/img/profile3.png";
import profile4 from "../../assets/img/profile4.png";
import profile5 from "../../assets/img/profile5.png";
import profile6 from "../../assets/img/profile6.png";
import calloglogo from "../../assets/img/calloglogo.png";
import appleImg from "../../assets/img/apple.png";
import bananaImg from "../../assets/img/banana.png";
import orangeImg from "../../assets/img/orange.png";
import grapeImg from "../../assets/img/grape.png";
import mangoImg from "../../assets/img/mango.png";
import strawberryImg from "../../assets/img/strawberry.png";

const Dashboard = () => {
  const { profile } = useContext(ProfileContext);
  const navigate = useNavigate();
  const { waterIntake, waterGoal, logWater, isGoalAchieved, resetWater } =
    useWaterTracking();

  // Get data from localStorage (saved from CreateUsername)
  const [userData, setUserData] = useState({
    bmr: 0,
    caloriesGoal: 0,
    tdee: 0,
    profile: {
      height_cm: 0,
      current_weight_kg: 0,
      goal_weight_kg: 0,
      sex: "",
      dob: "",
      fitness_goal: "",
      activity_level: "",
      dietary_preferences: "",
      allergies: "",
      medical_conditions: "",
      fitness_experience: "",
      username: "",
      email: "",
    },
  });

  // Calculate age from birthDate (same as CreateUsername)
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

  // Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation (same as CreateUsername)
  const calculateBMR = (weight, height, age, gender) => {
    if (weight <= 0 || height <= 0 || age <= 0) return 0;

    if (gender === "male") {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
  };

  // Calculate TDEE (Total Daily Energy Expenditure) based on activity level (same as CreateUsername)
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

  // Calculate suggested calorie goal based on weight goal (same as CreateUsername)
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

  // Recalculate metrics based on user data
  const recalculateMetrics = (userProfile) => {
    const {
      sex,
      dob,
      height_cm,
      current_weight_kg,
      goal_weight_kg,
      activity_level,
    } = userProfile;

    // Calculate age
    const age = calculateAge(dob);

    // Calculate health metrics using the same formulas as CreateUsername
    const bmr = calculateBMR(current_weight_kg, height_cm, age, sex);
    const tdee = calculateTDEE(bmr, activity_level);
    const caloriesGoal = calculateCalorieGoal(
      tdee,
      current_weight_kg,
      goal_weight_kg
    );

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      caloriesGoal,
      age,
    };
  };

  useEffect(() => {
    // Load user data from localStorage
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};

    // If no user data, redirect to signup
    if (!currentUser || Object.keys(currentUser).length === 0) {
      navigate("/signup");
      return;
    }

    // Extract data from the profile object where CreateUsername stores it
    const profileData = currentUser.profile || {};

    // Recalculate metrics to ensure consistency
    const calculatedMetrics = recalculateMetrics(profileData);

    setUserData({
      ...calculatedMetrics,
      profile: {
        height_cm: profileData.height_cm || 0,
        current_weight_kg: profileData.current_weight_kg || 0,
        goal_weight_kg: profileData.goal_weight_kg || 0,
        sex: profileData.sex || "",
        dob: profileData.dob || "",
        fitness_goal: profileData.fitness_goal || "",
        activity_level: profileData.activity_level || "",
        dietary_preferences: profileData.dietary_preferences || "",
        allergies: profileData.allergies || "",
        medical_conditions: profileData.medical_conditions || "",
        fitness_experience: profileData.fitness_experience || "",
        username: currentUser.username || profileData.username || "",
        email: currentUser.email || profileData.email || "",
      },
    });
  }, [navigate]);

  // Convert kg to lbs for display
  const kgToLbs = (kg) => Math.round(kg * 2.20462);

  // Convert cm to feet and inches for display
  const cmToFeetInches = (cm) => {
    const totalInches = cm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return { feet, inches };
  };

  const height = cmToFeetInches(userData.profile.height_cm);
  const age = calculateAge(userData.profile.dob);

  // ---- Notifications State ----
  const [notificationCount, setNotificationCount] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
    const inboxCount = storedMessages.filter(
      (msg) => !msg.blocked && msg.from !== "You"
    ).length;
    setNotificationCount(inboxCount);
  }, []);

  useEffect(() => {
    if (isGoalAchieved) {
      setShowCelebration(true);
      const timer = setTimeout(() => {
        setShowCelebration(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isGoalAchieved]);

  const handleWaterLog = () => {
    if (!isGoalAchieved) {
      logWater();
    }
  };

  const handleResetWater = () => {
    resetWater();
    setShowCelebration(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const exercises = [
    { id: 1, name: "Exercise One", reps: "10 reps, 3 sets", img: food1 },
    { id: 2, name: "Exercise Two", reps: "10 reps, 3 sets", img: food55 },
    { id: 3, name: "Exercise Three", reps: "10 reps, 3 sets", img: im3 },
    { id: 4, name: "Exercise Four", reps: "10 reps, 3 sets", img: im4 },
    { id: 5, name: "Exercise Five", reps: "10 reps, 3 sets", img: food1 },
    { id: 6, name: "Exercise Six", reps: "10 reps, 3 sets", img: food55 },
    { id: 7, name: "Exercise Seven", reps: "10 reps, 3 sets", img: im3 },
    { id: 8, name: "Exercise Eight", reps: "10 reps, 3 sets", img: im4 },
  ];

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Celebration Animation */}
      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <motion.div
            className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-[#1D2D44] mb-2">
              Congratulations!
            </h3>
            <p className="text-gray-600 mb-4">
              You've reached your daily water goal!
            </p>
            <button
              onClick={() => setShowCelebration(false)}
              className="bg-[#1D2D44] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#273554] transition"
            >
              Continue
            </button>
          </motion.div>
        </div>
      )}

      <div className="flex flex-1">
        {/* MAIN SECTION */}
        <section className="flex-1 space-y-6 p-6">
          {/* Top Section: Welcome + Water */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Welcome Card */}
            <div
              className="flex-[2] relative p-6 rounded-3xl shadow-md h-[260px] flex flex-col justify-between overflow-hidden bg-top bg-cover bg-no-repeat"
              style={{ backgroundImage: `url(${profile2})` }}
            >
              <div className="relative z-10">
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400">
                  Welcome, {userData.profile.username || "User"}!
                </h1>
                <p className="mt-4 text-base md:text-lg text-white max-w-lg leading-relaxed">
                  Begin your fitness journey today.
                  <br />
                  Track workouts, join programs, and
                  <br /> enjoy a healthier lifestyle!
                </p>
              </div>

              <div className="absolute bottom-6 left-6 flex items-center gap-3 z-10">
                <div className="flex -space-x-2">
                  <img
                    src={profile3}
                    alt="member1"
                    className="w-6 h-6 rounded-full border-2 border-white"
                  />
                  <img
                    src={profile4}
                    alt="member2"
                    className="w-6 h-6 rounded-full border-2 border-white"
                  />
                  <img
                    src={profile5}
                    alt="member3"
                    className="w-6 h-6 rounded-full border-2 border-white"
                  />
                </div>

                <span className="font-semibold text-white">1k+ members</span>
              </div>

              <div className="absolute bottom-6 right-6 z-10">
                <button className="bg-white text-[#1D2D44] px-5 py-2 rounded-full font-semibold shadow hover:bg-gray-100 transition">
                  Start Free Trial
                </button>
              </div>

              <div className="absolute inset-0 bg-black opacity-30 rounded-3xl"></div>
            </div>

            {/* Water Intake Card */}
            <div className="flex-1 bg-gradient-to-r from-[#1D2D44] to-[#273554] p-6 rounded-3xl shadow-md flex flex-col justify-center items-center h-[260px] text-white gap-4 relative">
              <FaGlassWhiskey className="text-4xl" />
              <p className="font-semibold text-xl">Daily Water Intake</p>
              <p className="text-lg font-bold">
                {waterIntake} / {waterGoal} Glasses
              </p>

              {/* Water glasses visualization */}
              <div className="flex gap-1 mb-2">
                {[...Array(waterGoal)].map((_, index) => (
                  <div
                    key={index}
                    className={`w-4 h-6 rounded-sm border ${
                      index < waterIntake
                        ? "bg-blue-400 border-blue-400"
                        : "bg-gray-700 border-gray-500"
                    }`}
                  ></div>
                ))}
              </div>

              {isGoalAchieved ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Goal Achieved! 🎉
                  </div>
                  <button
                    className="bg-white text-[#1D2D44] px-4 py-1 rounded-full text-sm font-semibold shadow hover:bg-gray-100 transition"
                    onClick={handleResetWater}
                  >
                    Reset Counter
                  </button>
                </div>
              ) : (
                <button
                  className="bg-white text-[#1D2D44] px-6 py-2 rounded-full font-semibold shadow hover:bg-gray-100 transition"
                  onClick={handleWaterLog}
                >
                  Log Water
                </button>
              )}
            </div>
          </div>

          {/* Three Cards + Exercise Card Section - Original Layout */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Three Cards Container */}
            <motion.div
              className="flex-1 bg-white rounded-3xl shadow-md flex justify-around items-center h-[250px] p-6 gap-4"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <div className="flex-1 flex flex-col items-center gap-3 p-6 rounded-2xl text-[#1D2D44] bg-gradient-to-br from-[#A1C4FD] to-[#C2E9FB] h-[210px]">
                <MdOutlineFitnessCenter className="text-5xl p-4 bg-[#1D2D44] text-white rounded-full" />
                <p className="text-base font-semibold">BMR</p>
                <p className="text-2xl font-bold">
                  {userData.bmr > 0 ? userData.bmr.toLocaleString() : "0"}{" "}
                  kcal/day
                </p>
              </div>

              <div className="flex-1 flex flex-col items-center gap-3 p-6 rounded-2xl text-[#1D2D44] bg-gradient-to-br from-[#FFD3B6] to-[#FFAAA5] h-[210px]">
                <GiFire className="text-5xl p-4 bg-[#1D2D44] text-white rounded-full" />
                <p className="text-base font-semibold">Calories Goal</p>
                <p className="text-2xl font-bold">
                  {userData.caloriesGoal > 0
                    ? userData.caloriesGoal.toLocaleString()
                    : "0"}{" "}
                  kcal/day
                </p>
              </div>

              <div className="flex-1 flex flex-col items-center gap-3 p-6 rounded-2xl text-[#1D2D44] bg-gradient-to-br from-[#C1F0C1] to-[#95E1D3] h-[210px]">
                <FaRunning className="text-5xl p-4 bg-[#1D2D44] text-white rounded-full" />
                <p className="text-base font-semibold">TDEE</p>
                <p className="text-2xl font-bold">
                  {userData.tdee > 0 ? userData.tdee.toLocaleString() : "0"}{" "}
                  kcal/day
                </p>
              </div>
            </motion.div>

            {/* Exercise Card - Original Layout */}
            <motion.div
              className="flex-1 bg-gradient-to-r from-[#1D2D44] to-[#273554] text-white p-6 rounded-3xl shadow-md flex flex-col justify-between h-[250px]"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold">
                    {exercises.length} Exercises
                  </h3>
                  <p className="text-sm">1 hour 50 minutes</p>
                </div>
                {/* Enlarged Circle */}
                <div className="mt-4 w-28 h-28 border-4 border-white rounded-full flex items-center justify-center text-2xl font-bold">
                  5/{exercises.length}
                </div>
              </div>

              {/* Button fixed at the bottom */}
              <div className="mt-auto flex justify-end">
                <button className="px-4 py-2 text-sm bg-white text-[#273554] rounded-full shadow">
                  Change Exercises
                </button>
              </div>
            </motion.div>
          </div>

          {/* User Stats Section */}
          {userData.profile.current_weight_kg > 0 && (
            <motion.div
              className="bg-white rounded-3xl shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-bold text-[#1D2D44] mb-4">
                Your Stats
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">Current Weight</p>
                  <p className="text-lg font-bold">
                    {kgToLbs(userData.profile.current_weight_kg)} lbs
                  </p>
                  <p className="text-sm text-gray-500">
                    ({userData.profile.current_weight_kg.toFixed(1)} kg)
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">Goal Weight</p>
                  <p className="text-lg font-bold">
                    {kgToLbs(userData.profile.goal_weight_kg)} lbs
                  </p>
                  <p className="text-sm text-gray-500">
                    ({userData.profile.goal_weight_kg.toFixed(1)} kg)
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">Height</p>
                  <p className="text-lg font-bold">
                    {height.feet}'{height.inches}"
                  </p>
                  <p className="text-sm text-gray-500">
                    ({userData.profile.height_cm} cm)
                  </p>
                </div>
                <div className="bg-amber-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">Age</p>
                  <p className="text-lg font-bold">{age} years</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Food Section Header */}
          <div className="mb-8 text-center mt-12">
            <h2 className="text-4xl font-bold text-[#1D2D44]">
              Food & Calories
            </h2>
            <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
              Track your daily food intake and see the calories for each item.
              Select your favorite foods to add them to your daily plan and
              maintain a balanced diet.
            </p>
          </div>

          {/* Food Flex Container */}
          <div className="flex flex-wrap justify-center gap-6 mt-6">
            {[
              { id: 1, name: "Apple", calories: 95, img: appleImg },
              { id: 2, name: "Banana", calories: 105, img: bananaImg },
              { id: 3, name: "Orange", calories: 62, img: orangeImg },
              { id: 4, name: "Strawberry", calories: 4, img: strawberryImg },
              { id: 5, name: "Grapes", calories: 62, img: grapeImg },
              { id: 6, name: "Mango", calories: 99, img: mangoImg },
            ].map((food, index) => (
              <motion.div
                key={food.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer w-64 flex flex-col"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.2,
                  duration: 1.2,
                  ease: "easeInOut",
                }}
              >
                {/* Food Image */}
                <div className="overflow-hidden rounded-t-2xl h-40 flex items-center justify-center bg-gray-50">
                  <img
                    src={food.img}
                    alt={food.name}
                    className="max-h-full w-auto object-contain transition-transform duration-700 hover:scale-110"
                  />
                </div>

                {/* Food Name & Calories */}
                <div className="p-4 flex flex-col items-center justify-center gap-2">
                  <h4 className="font-semibold text-lg text-[#1D2D44]">
                    {food.name}
                  </h4>
                  <p className="text-sm font-semibold text-white bg-[#1D2D44] px-3 py-1 rounded-full">
                    {food.calories} kcal
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
