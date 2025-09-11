import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GiFire } from "react-icons/gi";
import { MdOutlineFitnessCenter } from "react-icons/md";
import { FaRunning } from "react-icons/fa";
import { motion } from "framer-motion";
import calloglogo from "../../assets/img/calloglogo.png";

const HomeSummary = ({ user }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Home Summary");

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

  // Convert height/weight
  const heightCm = user.heightFt * 30.48 + user.heightIn * 2.54;
  const weightKg = user.weightLbs * 0.453592;

  // Calculate BMR
  let baseBmr = 0;
  if (weightKg > 0 && heightCm > 0 && user.age > 0) {
    baseBmr =
      user.gender === "Male"
        ? Math.round(10 * weightKg + 6.25 * heightCm - 5 * user.age + 5)
        : Math.round(10 * weightKg + 6.25 * heightCm - 5 * user.age - 161);
  }

  const [bmr, setBmr] = useState(baseBmr);
  const [caloriesGoal, setCaloriesGoal] = useState(
    baseBmr ? Math.round(baseBmr * 1.2) : 0
  );
  const [tdee, setTdee] = useState(baseBmr ? Math.round(baseBmr * 1.55) : 0);

  useEffect(() => {
    if (userGoals.calories) {
      setCaloriesGoal(Number(userGoals.calories));
    } else {
      setCaloriesGoal(baseBmr ? Math.round(baseBmr * 1.2) : 0);
    }
  }, [userGoals.calories, baseBmr]);

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
    const newEntry = { ...checkIn, date: today };

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
            <div className="flex flex-wrap justify-between items-start gap-8 mt-8 max-w-6xl mx-auto px-4">
              <motion.div
                className="bg-gray-200 rounded-xl -ml-32 shadow-lg p-6 flex-1 max-w-xl"
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

              <div className="flex flex-row flex-wrap -mr-56 justify-center gap-6 flex-1">
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
                  <p className="text-2xl font-bold">{bmr || 0} kcal/day</p>
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
                    {caloriesGoal || 0} kcal/day
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
                  <p className="text-2xl font-bold">{tdee || 0} kcal/day</p>
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
                  src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=400&q=80&auto=format"
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
                    />
                  </div>
                </div>
              </div>
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
                  name: "steps",
                  label: "Steps Walked",
                  placeholder: "Number of steps today",
                },
                {
                  name: "sleep",
                  label: "Sleep (hours)",
                  placeholder: "Hours of sleep",
                },
                {
                  name: "mood",
                  label: "Mood (1–10)",
                  placeholder: "Rate your mood 1-10",
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
                    min={item.name === "mood" ? "1" : "0"}
                    max={item.name === "mood" ? "10" : ""}
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
                checkIn.steps ||
                checkIn.sleep ||
                checkIn.mood ? (
                  <ul className="space-y-2">
                    {checkIn.weight && (
                      <li>
                        Weight: <strong>{checkIn.weight} kg</strong>
                      </li>
                    )}
                    {checkIn.steps && (
                      <li>
                        Steps: <strong>{checkIn.steps}</strong>
                      </li>
                    )}
                    {checkIn.sleep && (
                      <li>
                        Sleep: <strong>{checkIn.sleep} hours</strong>
                      </li>
                    )}
                    {checkIn.mood && (
                      <li>
                        Mood: <strong>{checkIn.mood}/10</strong>
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
                        {entry.weight && ` Weight: ${entry.weight}kg |`}
                        {entry.steps && ` Steps: ${entry.steps} |`}
                        {entry.sleep && ` Sleep: ${entry.sleep}h |`}
                        {entry.mood && ` Mood: ${entry.mood}/10`}
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
      <nav className="relative flex justify-between items-center bg-[#1D2D44] px-6 py-3 shadow-lg">
        <div className="flex items-center gap-3">
          <img src={calloglogo} alt="Logo" className="h-10 w-auto" />
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
