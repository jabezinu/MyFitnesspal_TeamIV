import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GiFire } from "react-icons/gi";
import { MdOutlineFitnessCenter } from "react-icons/md";
import { FaRunning } from "react-icons/fa";
import { motion } from "framer-motion";
import { ProfileContext } from "../../context/ProfileContext";

const HomeSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useContext(ProfileContext);
  const [activeTab, setActiveTab] = useState("Home Summary");

  // Get data passed from CreateUsername component
  const userDataFromSignup = location.state || {};

  const [userData, setUserData] = useState({
    bmr: userDataFromSignup.bmr || 0,
    caloriesGoal: userDataFromSignup.calorieGoal || 0,
    tdee: userDataFromSignup.tdee || 0,
    profile: {
      height_cm: userDataFromSignup.height || 0,
      current_weight_kg: userDataFromSignup.weight || 0,
      goal_weight_kg: userDataFromSignup.goal_weight_kg || 0,
      sex: userDataFromSignup.gender || "",
      dob: userDataFromSignup.dob || "",
      activity_level: userDataFromSignup.activity_level || "moderate",
    },
    macros: userDataFromSignup.macros || {
      protein: 0,
      fat: 0,
      carbs: 0,
    },
  });

  // Calculate age from date of birth
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

  // Convert kg to lbs for display
  const kgToLbs = (kg) => Math.round(kg * 2.20462);

  // Convert cm to feet and inches for display
  const cmToFeetInches = (cm) => {
    const totalInches = cm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return { feet, inches };
  };

  // Load additional user data if needed, but prioritize data from signup
  useEffect(() => {
    // If we have data from signup, use that as primary source
    if (userDataFromSignup.bmr) {
      setUserData({
        bmr: userDataFromSignup.bmr,
        caloriesGoal: userDataFromSignup.calorieGoal,
        tdee: userDataFromSignup.tdee,
        profile: {
          height_cm: userDataFromSignup.height || 0,
          current_weight_kg: userDataFromSignup.weight || 0,
          goal_weight_kg: userDataFromSignup.goal_weight_kg || 0,
          sex: userDataFromSignup.gender || "",
          dob: userDataFromSignup.dob || "",
          activity_level: userDataFromSignup.activity_level || "moderate",
        },
        macros: userDataFromSignup.macros || {
          protein: 0,
          fat: 0,
          carbs: 0,
        },
      });
    } else {
      // Fallback to localStorage if no signup data
      const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
      const userProfile = JSON.parse(localStorage.getItem("userProfile")) || {};
      const profileData = currentUser.profile || {};

      setUserData({
        bmr: Math.round(profileData.bmr) || 0,
        caloriesGoal: Math.round(profileData.daily_calorie_goal) || 0,
        tdee: Math.round(profileData.tdee) || 0,
        profile: {
          height_cm: profileData.height_cm || 0,
          current_weight_kg: profileData.current_weight_kg || 0,
          goal_weight_kg: profileData.goal_weight_kg || 0,
          sex: profileData.sex || "",
          dob: profileData.dob || "",
          activity_level: profileData.activity_level || "",
        },
      });
    }
  }, [userDataFromSignup]);

  const [userGoals, setUserGoals] = useState(
    JSON.parse(localStorage.getItem("userGoals")) || {
      calories: userDataFromSignup.calorieGoal || "",
      carbs: userDataFromSignup.macros?.carbs || "",
      protein: userDataFromSignup.macros?.protein || "",
      fat: userDataFromSignup.macros?.fat || "",
      water: "",
      weightLoss: userDataFromSignup.weeklyGoal || "0.5",
      exerciseDays: "3",
      minutes: "30",
    }
  );

  const [checkIn, setCheckIn] = useState({
    weight: userDataFromSignup.weight || "",
    steps: "",
    sleep: "",
    mood: "",
  });

  const [checkInHistory, setCheckInHistory] = useState(
    JSON.parse(localStorage.getItem("checkInHistory")) || []
  );

  const handleGoalChange = (e) => {
    const { name, value } = e.target;
    const updatedGoals = { ...userGoals, [name]: value };
    setUserGoals(updatedGoals);
    localStorage.setItem("userGoals", JSON.stringify(updatedGoals));
  };

  const handleCheckInChange = (e) => {
    const { name, value } = e.target;
    setCheckIn({ ...checkIn, [name]: value });
  };

  const handleSaveCheckIn = () => {
    const today = new Date().toLocaleDateString();
    const newEntry = {
      ...checkIn,
      date: today,
      // Include the current metrics in the check-in
      bmr: userData.bmr,
      caloriesGoal: userData.caloriesGoal,
      tdee: userData.tdee,
      // Round the weight value when saving
      weight: checkIn.weight ? Math.round(checkIn.weight * 10) / 10 : "",
    };

    const updatedHistory = [...checkInHistory, newEntry];
    setCheckInHistory(updatedHistory);
    localStorage.setItem("checkInHistory", JSON.stringify(updatedHistory));

    alert("✅ Check-in saved successfully!");
  };

  const handleTabClick = (tab) => {
    if (tab === "Mail") {
      navigate("/sendmail");
    } else if (tab === "Profile") {
      navigate("/profile");
    } else {
      setActiveTab(tab);
    }
  };

  // Format activity level for display
  const formatActivityLevel = (level) => {
    const levelMap = {
      sedentary: "Sedentary",
      light: "Lightly Active",
      moderate: "Moderately Active",
      active: "Very Active",
      very_active: "Extremely Active",
    };
    return levelMap[level] || level;
  };

  const renderTabContent = () => {
    const height = cmToFeetInches(userData.profile.height_cm);
    const age = calculateAge(userData.profile.dob);
    const activityLevel = formatActivityLevel(userData.profile.activity_level);

    switch (activeTab) {
      case "Home Summary":
        return (
          <>
            <div className="flex flex-wrap justify-between items-start gap-8 mt-8 max-w-6xl mx-auto px-4">
              {/* Health Metrics Explanation */}
              <motion.div
                className="bg-gray-200 rounded-xl shadow-lg p-6 flex-1 max-w-sm"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-xl font-bold text-[#1D2D44] mb-2">
                  Understanding Your Results
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Your <strong>BMR</strong> is the calories your body burns at
                  rest. <br />
                  <strong>TDEE</strong> is the estimated daily calories burned
                  considering activity. <br />
                  <strong>Calories Goal</strong> is your suggested daily target
                  based on goals.
                </p>
                <button
                  onClick={() => navigate("/edit-profile")}
                  className="mt-4 px-4 py-2 bg-[#1D2D44] text-white rounded-lg text-sm hover:bg-[#142030] transition"
                >
                  Update My Profile
                </button>
              </motion.div>

              {/* Health Metrics Cards */}
              <div className="flex flex-row flex-wrap justify-center gap-6 flex-1">
                <motion.div
                  className="flex flex-col items-center gap-3 p-6 w-48 rounded-2xl text-[#1D2D44] bg-gradient-to-br from-[#A1C4FD] to-[#C2E9FB] shadow-lg cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  whileHover={{ scale: 1.08, rotate: 1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MdOutlineFitnessCenter className="text-5xl p-4 bg-[#1D2D44] text-white rounded-full shadow" />
                  <p className="text-lg font-semibold">BMR</p>
                  <p className="text-2xl font-bold">
                    {userData.bmr.toLocaleString()} kcal/day
                  </p>
                </motion.div>

                <motion.div
                  className="flex flex-col items-center gap-3 p-6 w-48 rounded-2xl text-[#1D2D44] bg-gradient-to-br from-[#FFD3B6] to-[#FFAAA5] shadow-lg cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{ scale: 1.08, rotate: 1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <GiFire className="text-5xl p-4 bg-[#1D2D44] text-white rounded-full shadow" />
                  <p className="text-lg font-semibold">Calories Goal</p>
                  <p className="text-2xl font-bold">
                    {userData.caloriesGoal.toLocaleString()} kcal/day
                  </p>
                </motion.div>

                <motion.div
                  className="flex flex-col items-center gap-3 p-6 w-48 rounded-2xl text-[#1D2D44] bg-gradient-to-br from-[#C1F0C1] to-[#95E1D3] shadow-lg cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ scale: 1.08, rotate: 1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaRunning className="text-5xl p-4 bg-[#1D2D44] text-white rounded-full shadow" />
                  <p className="text-lg font-semibold">TDEE</p>
                  <p className="text-2xl font-bold">
                    {userData.tdee.toLocaleString()} kcal/day
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Macro Nutrients Summary */}
            {userData.macros && (
              <motion.div
                className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-[#1D2D44] mb-4">
                  Your Macro Goals
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-800">
                      Protein
                    </h3>
                    <p className="text-2xl font-bold">
                      {userData.macros.protein}g
                    </p>
                    <p className="text-sm text-gray-600">
                      {(userData.macros.protein * 4).toLocaleString()} calories
                    </p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-800">
                      Carbs
                    </h3>
                    <p className="text-2xl font-bold">
                      {userData.macros.carbs}g
                    </p>
                    <p className="text-sm text-gray-600">
                      {(userData.macros.carbs * 4).toLocaleString()} calories
                    </p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-yellow-800">
                      Fat
                    </h3>
                    <p className="text-2xl font-bold">{userData.macros.fat}g</p>
                    <p className="text-sm text-gray-600">
                      {(userData.macros.fat * 9).toLocaleString()} calories
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Promotions / Ads */}
            <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto mt-6">
              {/* Ad 1 */}
              <motion.div
                className="bg-gradient-to-r from-[#6BCB77] to-[#4D9078] rounded-xl shadow-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 w-full mt-6 hover:scale-105 transition-transform duration-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    🥗 Eat Smarter, Feel Better
                  </h2>
                  <p className="text-white text-lg max-w-md">
                    Get access to healthy, delicious recipes tailored to your
                    calorie goals.
                  </p>
                  <button className="mt-4 px-6 py-2 bg-white text-[#1D2D44] rounded-lg shadow-md hover:bg-gray-100 transition">
                    Explore Recipes
                  </button>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80&auto=format"
                  alt="Healthy Recipes"
                  className="w-40 h-40 object-cover rounded-lg shadow-md flex-shrink-0"
                />
              </motion.div>
            </div>
          </>
        );
      case "Goals":
        return (
          <div className="max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow-lg mt-6">
            <h2 className="text-3xl font-bold mb-6 text-[#1D2D44]">Goals</h2>
            <p className="text-gray-600 mb-6">
              Set and adjust your fitness and nutrition targets
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nutrition Goals */}
              <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-[#1D2D44] flex items-center gap-2">
                  <span>🔥</span> Nutrition Goals
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-1">
                        Protein (g)
                      </label>
                      <input
                        type="number"
                        name="protein"
                        value={userGoals.protein}
                        onChange={handleGoalChange}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-1">
                        Carbs (g)
                      </label>
                      <input
                        type="number"
                        name="carbs"
                        value={userGoals.carbs}
                        onChange={handleGoalChange}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-1">
                        Fat (g)
                      </label>
                      <input
                        type="number"
                        name="fat"
                        value={userGoals.fat}
                        onChange={handleGoalChange}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Fitness Goals */}
              <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-[#1D2D44] flex items-center gap-2">
                  <span>💪</span> Fitness Goals
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                      Target Weight Loss (kg/week)
                    </label>
                    <input
                      type="number"
                      name="weightLoss"
                      value={userGoals.weightLoss}
                      onChange={handleGoalChange}
                      className="w-full p-2 border rounded-lg"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                      Exercise Days/Week
                    </label>
                    <input
                      type="number"
                      name="exerciseDays"
                      value={userGoals.exerciseDays}
                      onChange={handleGoalChange}
                      className="w-full p-2 border rounded-lg"
                      min="0"
                      max="7"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                      Exercise Minutes/Day
                    </label>
                    <input
                      type="number"
                      name="minutes"
                      value={userGoals.minutes}
                      onChange={handleGoalChange}
                      className="w-full p-2 border rounded-lg"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Display Box for Current Goals */}
            <div className="mt-8 bg-blue-50 p-6 rounded-xl border border-blue-200">
              <h3 className="text-xl font-semibold mb-4 text-[#1D2D44] flex items-center gap-2">
                <span>📋</span> Your Current Goals
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">
                    Nutrition Goals
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Protein: {userGoals.protein || "0"}g/day</li>
                    <li>• Carbs: {userGoals.carbs || "0"}g/day</li>
                    <li>• Fat: {userGoals.fat || "0"}g/day</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">
                    Fitness Goals
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Weight Loss: {userGoals.weightLoss || "0"}kg/week</li>
                    <li>
                      • Exercise: {userGoals.exerciseDays || "0"} days/week
                    </li>
                    <li>• Duration: {userGoals.minutes || "0"} minutes/day</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => {
                  // Save logic would go here
                  alert("Goals saved successfully!");
                }}
                className="px-6 py-3 bg-[#1D2D44] text-white rounded-lg font-semibold hover:bg-[#163153] transition-colors shadow-md"
              >
                Save Goals
              </button>
            </div>
          </div>
        );
      case "CheckIn":
        return (
          <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-lg mt-6">
            <h2 className="text-2xl font-bold mb-4 text-[#1D2D44]">
              Daily Check-In
            </h2>
            <p className="text-gray-600 mb-6">
              Record your daily progress and metrics
            </p>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={checkIn.weight}
                  onChange={handleCheckInChange}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Enter today's weight"
                  min="0"
                  step="0.1"
                />
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4 text-[#1D2D44]">
                Today's Summary
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                {checkIn.weight ? (
                  <ul className="space-y-2">
                    <li>
                      Weight:{" "}
                      <strong>{Math.round(checkIn.weight * 10) / 10} kg</strong>
                    </li>
                    <li>
                      BMR:{" "}
                      <strong>{userData.bmr.toLocaleString()} kcal/day</strong>
                    </li>
                    <li>
                      TDEE:{" "}
                      <strong>{userData.tdee.toLocaleString()} kcal/day</strong>
                    </li>
                    <li>
                      Calories Goal:{" "}
                      <strong>
                        {userData.caloriesGoal.toLocaleString()} kcal/day
                      </strong>
                    </li>
                  </ul>
                ) : (
                  <p className="text-gray-500">No data entered yet</p>
                )}
              </div>

              <button
                onClick={handleSaveCheckIn}
                className="mt-6 px-6 py-3 bg-[#1D2D44] text-white rounded-lg shadow-md hover:bg-[#142030] transition w-full"
              >
                Save Check-In
              </button>

              {checkInHistory.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-[#1D2D44] mb-4">
                    📊 Check-In History
                  </h3>
                  <ul className="space-y-2">
                    {checkInHistory.map((entry, idx) => (
                      <li
                        key={idx}
                        className="p-3 bg-gray-100 rounded-lg text-sm"
                      >
                        <strong>{entry.date}:</strong>
                        {entry.weight &&
                          ` Weight: ${Math.round(entry.weight * 10) / 10}kg`}
                        {entry.bmr && `, BMR: ${entry.bmr}kcal`}
                        {entry.tdee && `, TDEE: ${entry.tdee}kcal`}
                        {entry.caloriesGoal &&
                          `, Goal: ${entry.caloriesGoal}kcal`}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return <div className="p-6">Other tabs...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Tabs - Keep this for the HomeSummary-specific tabs */}
      <nav className="relative flex justify-between items-center bg-[#1D2D44] px-6 py-3 shadow-lg">
        <div className="flex items-center gap-3">
          <h1
            className="text-white text-xl font-bold cursor-pointer hover:underline"
            onClick={() => navigate("/dashboard")}
            style={{ cursor: "pointer" }}
          >
            Home Dashboard
          </h1>
        </div>
        <div className="relative flex gap-6">
          {["Home Summary", "Goals", "CheckIn", "Mail", "Profile"].map(
            (tab) => (
              <div key={tab} className="relative">
                <button
                  onClick={() => handleTabClick(tab)}
                  className={`px-4 py-2 font-semibold text-white transition-all duration-300 ${
                    activeTab === tab
                      ? "text-white scale-105"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
                {activeTab === tab && tab !== "Mail" && tab !== "Profile" && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 bottom-0 h-1 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FFD93D]"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </div>
            )
          )}
        </div>
      </nav>

      <div className="p-6 space-y-8">{renderTabContent()}</div>
    </div>
  );
};

export default HomeSummary;
