import React, { useState, useEffect, useContext } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import { ProfileContext } from "../../context/ProfileContext";
import { useMeals } from "../../context/MealsContext";
import {
  FiTrendingUp,
  FiTrendingDown,
  FiActivity,
  FiTarget,
} from "react-icons/fi";

const ProgressTracking = () => {
  const { profile } = useContext(ProfileContext);
  const { meals } = useMeals();
  const [timeRange, setTimeRange] = useState("week");
  const [weightData, setWeightData] = useState([]);
  const [caloriesData, setCaloriesData] = useState([]);
  const [macrosData, setMacrosData] = useState([]);

  // Generate sample data based on user profile and meals
  useEffect(() => {
    // Generate weight data
    const generatedWeightData = [];
    const startWeight = profile?.weightLbs || 180;
    const goalWeight = profile?.goalWeight || 160;

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));

      // Simulate weight loss progress
      const progress = i / 6;
      const currentWeight = startWeight - (startWeight - goalWeight) * progress;

      generatedWeightData.push({
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        weight: Math.round(currentWeight * 10) / 10,
        goal: goalWeight,
      });
    }
    setWeightData(generatedWeightData);

    // Generate calories data from meals
    const generatedCaloriesData = [];
    const tdee = profile?.dailyCalories || 2200; // Use TDEE from profile

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));

      // Calculate calories from meals if available
      let consumed = 0;
      if (meals) {
        Object.values(meals).forEach((meal) => {
          meal?.forEach((item) => {
            consumed += item.calories || 0;
          });
        });
      } else {
        // Fallback: random data between 1800-2500
        consumed = Math.floor(Math.random() * 700) + 1800;
      }

      // Random burned calories around TDEE ±200
      const burned = tdee + Math.floor(Math.random() * 400) - 200;

      generatedCaloriesData.push({
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        consumed,
        burned,
        net: consumed - burned,
      });
    }
    setCaloriesData(generatedCaloriesData);

    // Generate macros data
    const generatedMacrosData = [];
    if (meals) {
      let totalCarbs = 0;
      let totalProtein = 0;
      let totalFat = 0;

      Object.values(meals).forEach((meal) => {
        meal?.forEach((item) => {
          totalCarbs += item.carbs || 0;
          totalProtein += item.protein || 0;
          totalFat += item.fat || 0;
        });
      });

      generatedMacrosData.push(
        { name: "Carbs", value: totalCarbs },
        { name: "Protein", value: totalProtein },
        { name: "Fat", value: totalFat }
      );
    } else {
      // Sample data
      generatedMacrosData.push(
        { name: "Carbs", value: 250 },
        { name: "Protein", value: 150 },
        { name: "Fat", value: 70 }
      );
    }
    setMacrosData(generatedMacrosData);
  }, [profile, meals, timeRange]);

  // Calculate statistics
  const totalCaloriesConsumed = caloriesData.reduce(
    (sum, day) => sum + day.consumed,
    0
  );
  const totalCaloriesBurned = caloriesData.reduce(
    (sum, day) => sum + day.burned,
    0
  );
  const avgWeight =
    weightData.reduce((sum, day) => sum + day.weight, 0) / weightData.length;
  const weightChange =
    weightData.length > 1
      ? weightData[weightData.length - 1].weight - weightData[0].weight
      : 0;

  const COLORS = ["#FF6B6B", "#4CAF50", "#FFD93D", "#6BCB77", "#4D96FF"];

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-[#1D2D44] mb-2">
          Progress Tracking
        </h2>
        <p className="text-gray-600">
          Monitor your fitness journey with detailed analytics and insights
        </p>

        {/* Time Range Selector */}
        <div className="flex gap-2 mt-4">
          {["week", "month", "3months"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                timeRange === range
                  ? "bg-[#1D2D44] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {range === "week" ? "1W" : range === "month" ? "1M" : "3M"}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Current Weight</p>
              <p className="text-2xl font-bold text-[#1D2D44]">
                {weightData.length > 0
                  ? weightData[weightData.length - 1].weight
                  : "--"}{" "}
                lbs
              </p>
            </div>
            <FiActivity className="text-3xl text-blue-500" />
          </div>
          {weightChange !== 0 && (
            <p
              className={`text-sm mt-2 ${
                weightChange < 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {weightChange < 0 ? "↓" : "↑"} {Math.abs(weightChange).toFixed(1)}{" "}
              lbs
            </p>
          )}
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Avg Daily Calories</p>
              <p className="text-2xl font-bold text-[#1D2D44]">
                {Math.round(
                  totalCaloriesConsumed / Math.max(1, caloriesData.length)
                )}
              </p>
            </div>
            <FiTrendingUp className="text-3xl text-orange-500" />
          </div>
          <p className="text-sm mt-2 text-gray-600">
            Net:{" "}
            {Math.round(
              (totalCaloriesConsumed - totalCaloriesBurned) /
                Math.max(1, caloriesData.length)
            )}{" "}
            kcal/day
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Goal Progress</p>
              <p className="text-2xl font-bold text-[#1D2D44]">
                {profile?.goalWeight
                  ? Math.round((avgWeight - profile.goalWeight) * 10) / 10
                  : "--"}{" "}
                lbs
              </p>
            </div>
            <FiTarget className="text-3xl text-purple-500" />
          </div>
          <p className="text-sm mt-2 text-gray-600">
            Target: {profile?.goalWeight || "--"} lbs
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Calorie Balance</p>
              <p className="text-2xl font-bold text-[#1D2D44]">
                {totalCaloriesConsumed - totalCaloriesBurned}
              </p>
            </div>
            <FiTrendingDown className="text-3xl text-green-500" />
          </div>
          <p
            className={`text-sm mt-2 ${
              totalCaloriesConsumed - totalCaloriesBurned < 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {totalCaloriesConsumed - totalCaloriesBurned < 0
              ? "Deficit"
              : "Surplus"}
          </p>
        </motion.div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weight Progress Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-[#1D2D44]">
            Weight Progress
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={weightData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="weight"
                stroke="#FF6B6B"
                fill="#FF6B6B"
                fillOpacity={0.3}
                name="Current Weight"
              />
              <Area
                type="monotone"
                dataKey="goal"
                stroke="#4CAF50"
                fill="#4CAF50"
                fillOpacity={0.1}
                strokeDasharray="5 5"
                name="Goal Weight"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Calories Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-[#1D2D44]">
            Calories Tracking
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={caloriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="consumed" fill="#FF6B6B" name="Calories Consumed" />
              <Bar dataKey="burned" fill="#4CAF50" name="Calories Burned" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Macronutrients Pie Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-[#1D2D44]">
            Macronutrient Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={macrosData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {macrosData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}g`, ""]} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Net Calories Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-[#1D2D44]">
            Daily Calorie Balance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={caloriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="net"
                fill={(data) => (data.net < 0 ? "#4CAF50" : "#FF6B6B")}
                name="Net Calories"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-[#1D2D44]">
          Weekly Summary
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">Total Calories Consumed</p>
            <p className="text-2xl font-bold text-blue-600">
              {totalCaloriesConsumed} kcal
            </p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">Total Calories Burned</p>
            <p className="text-2xl font-bold text-green-600">
              {totalCaloriesBurned} kcal
            </p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600">Average Weight</p>
            <p className="text-2xl font-bold text-purple-600">
              {avgWeight.toFixed(1)} lbs
            </p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <p className="text-sm text-gray-600">Weight Change</p>
            <p
              className={`text-2xl font-bold ${
                weightChange < 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {weightChange.toFixed(1)} lbs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracking;
