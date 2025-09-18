import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GiFire } from "react-icons/gi";
import { MdOutlineFitnessCenter } from "react-icons/md";
import { FaRunning } from "react-icons/fa";
import { motion } from "framer-motion";
import { ProfileContext } from "../../context/ProfileContext";

const HomeSummary = () => {
  const navigate = useNavigate();
  const { profile } = useContext(ProfileContext);
  const [activeTab, setActiveTab] = useState("Home Summary");

 
  const [userData, setUserData] = useState({
    bmr: 0,
    caloriesGoal: 0,
    tdee: 0,
  });

  useEffect(() => {
    
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};

    setUserData({
      bmr: Math.round(currentUser.bmr) || 0,
      caloriesGoal: Math.round(currentUser.caloriesGoal) || 0,
      tdee: Math.round(currentUser.dailyCalories) || 0, // dailyCalories from ResultsPage is TDEE
    });
  }, []);

  const [userGoals, setUserGoals] = useState(
    JSON.parse(localStorage.getItem("userGoals")) || {
      calories: "",
      carbs: "",
      protein: "",
      fat: "",
      water: "",
      weightLoss: "0.5",
      exerciseDays: "3",
      minutes: "30",
    }
  );

  const [checkIn, setCheckIn] = useState({
    weight: "",
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
      // Round the values when saving
      weight: checkIn.weight ? Math.round(checkIn.weight * 10) / 10 : "",
      bmr: checkIn.bmr ? Math.round(checkIn.bmr) : "",
      calories: checkIn.calories ? Math.round(checkIn.calories) : "",
      tdee: checkIn.tdee ? Math.round(checkIn.tdee) : "",
    };

    const updatedHistory = [...checkInHistory, newEntry];
    setCheckInHistory(updatedHistory);
    localStorage.setItem("checkInHistory", JSON.stringify(updatedHistory));

    alert("✅ Check-in saved successfully!");

    setCheckIn({
      weight: "",
      steps: "",
      sleep: "",
      mood: "",
    });
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

  const renderTabContent = () => {
    switch (activeTab) {
      case "Home Summary":
        return (
          <>
            <div className="flex flex-wrap justify-between items-start gap-8 mt-8 max-w-6xl mx-auto px-4 ">
              <motion.div
                className="bg-gray-200 rounded-xl shadow-lg p-6 flex-1 max-w-sm"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
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
              </motion.div>

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

              {/* Ad 2 */}
              <motion.div
                className="bg-gradient-to-r from-[#FF6B6B] to-[#FFD93D] rounded-xl shadow-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 w-full md:w-[48%] hover:scale-105 transition-transform duration-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    🔥 Boost Your Progress!
                  </h2>
                  <p className="text-white text-lg max-w-md">
                    Try premium meal plans and workout programs for faster
                    results.
                  </p>
                  <button className="mt-4 px-6 py-2 bg-white text-[#1D2D44] rounded-lg shadow-md hover:bg-gray-100 transition">
                    Learn More
                  </button>
                </div>
                <img
                  src="https://images.unsplash.com-1605296867304-46d5465a13f1?w=400&q=80&auto=format"
                  alt="Healthy Food"
                  className="w-40 h-40 object-cover rounded-lg shadow-md flex-shrink-0"
                />
              </motion.div>

              {/* Ad 3 */}
              <motion.div
                className="bg-gradient-to-r from-[#1D2D44] to-[#3C4A6B] rounded-xl shadow-xl p-6 flex flex-col md:flex-row-reverse items-center justify-between gap-4 w-full md:w-[48%] hover:scale-105 transition-transform duration-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    🏋️ Join Our Fitness Challenge!
                  </h2>
                  <p className="text-white text-lg max-w-md">
                    Sign up today for a 30-day transformation challenge with top
                    trainers.
                  </p>
                  <button className="mt-4 px-6 py-2 bg-white text-[#1D2D44] rounded-lg shadow-md hover:bg-gray-100 transition">
                    Sign Up Now
                  </button>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80&auto=format"
                  alt="Workout"
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
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                      Daily Calories
                    </label>
                    <input
                      type="number"
                      name="calories"
                      value={userGoals.calories}
                      onChange={handleGoalChange}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
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
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                      Water (L)
                    </label>
                    <input
                      type="number"
                      name="water"
                      value={userGoals.water}
                      onChange={handleGoalChange}
                      className="w-full p-2 border rounded-lg"
                      step="0.1"
                    />
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
                    <li>• Calories: {userGoals.calories || "0"} kcal/day</li>
                    <li>• Protein: {userGoals.protein || "0"}g/day</li>
                    <li>• Carbs: {userGoals.carbs || "0"}g/day</li>
                    <li>• Fat: {userGoals.fat || "0"}g/day</li>
                    <li>• Water: {userGoals.water || "0"}L/day</li>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  name: "weight",
                  label: "Weight (kg)",
                  placeholder: "Enter today's weight",
                },
                {
                  name: "bmr",
                  label: "BMR",
                  placeholder: "Enter your BMR",
                },
                {
                  name: "calories",
                  label: "Calories Goal",
                  placeholder: "Enter calorie goal",
                },
                {
                  name: "tdee",
                  label: "TDEE",
                  placeholder: "Enter your TDEE",
                },
              ].map((item) => (
                <div key={item.name}>
                  <label className="block text-gray-700 font-semibold mb-1">
                    {item.label}
                  </label>
                  <input
                    type="number"
                    name={item.name}
                    value={checkIn[item.name]}
                    onChange={handleCheckInChange}
                    className="w-full p-3 border rounded-lg"
                    placeholder={item.placeholder}
                    min="0"
                    step={item.name === "weight" ? "0.1" : "1"}
                  />
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4 text-[#1D2D44]">
                Today's Summary
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                {checkIn.weight ||
                checkIn.bmr ||
                checkIn.calories ||
                checkIn.tdee ? (
                  <ul className="space-y-2">
                    {checkIn.weight && (
                      <li>
                        Weight:{" "}
                        <strong>
                          {Math.round(checkIn.weight * 10) / 10} kg
                        </strong>
                      </li>
                    )}
                    {checkIn.bmr && (
                      <li>
                        BMR: <strong>{Math.round(checkIn.bmr)}</strong>
                      </li>
                    )}
                    {checkIn.calories && (
                      <li>
                        Calories Goal:{" "}
                        <strong>{Math.round(checkIn.calories)}</strong>
                      </li>
                    )}
                    {checkIn.tdee && (
                      <li>
                        TDEE: <strong>{Math.round(checkIn.tdee)}</strong>
                      </li>
                    )}
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
                          ` Weight: ${Math.round(entry.weight * 10) / 10}kg |`}
                        {entry.bmr && ` BMR: ${Math.round(entry.bmr)} |`}
                        {entry.calories &&
                          ` Calories: ${Math.round(entry.calories)} |`}
                        {entry.tdee && ` TDEE: ${Math.round(entry.tdee)}`}
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
