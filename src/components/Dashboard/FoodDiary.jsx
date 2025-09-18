import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import calloglogo from "../../assets/img/calloglogo.png";
import { useMeals } from "../../context/MealsContext";

const FoodDiary = ({ selectedDate }) => {
  const navigate = useNavigate();
  const { meals, setMeals, dailyGoal } = useMeals();

  const [activeTab, setActiveTab] = useState("Food Diary");

  // My Foods state
  const [myFoodEntry, setMyFoodEntry] = useState({});
  const [myFoodList, setMyFoodList] = useState([]);
  const [selectedMealType, setSelectedMealType] = useState("Breakfast");

  // Ensure default meals exist
  const mealKeys =
    meals && Object.keys(meals).length
      ? Object.keys(meals)
      : ["Breakfast", "Lunch", "Dinner"];

  // Calculate totals across meals
  const calculateTotals = () => {
    let totals = {
      calories: 0,
      carbs: 0,
      fat: 0,
      protein: 0,
      sodium: 0,
      sugar: 0,
    };
    Object.values(meals || {}).forEach((meal) => {
      (meal || []).forEach((item) => {
        totals.calories += item.calories || 0;
        totals.carbs += item.carbs || 0;
        totals.fat += item.fat || 0;
        totals.protein += item.protein || 0;
        totals.sodium += item.sodium || 0;
        totals.sugar += item.sugar || 0;
      });
    });
    return totals;
  };

  const totals = calculateTotals();

  // Remove food
  const handleRemove = (mealType, index) => {
    if (!meals || !Array.isArray(meals[mealType])) return;
    const updatedMeals = { ...meals };
    updatedMeals[mealType] = [...updatedMeals[mealType]];
    updatedMeals[mealType].splice(index, 1);
    setMeals(updatedMeals);
  };

  // Navigate to FoodSearch
  const handleNavigateToSearch = (mealType) => {
    navigate("/foodsearch", { state: { mealType, selectedDate } });
  };

  // My Foods Handlers
  const handleMyFoodChange = (e) => {
    const { name, value } = e.target;
    setMyFoodEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddMyFood = () => {
    if (!myFoodEntry.foodName) return;
    setMyFoodList((prev) => [...prev, myFoodEntry]);
    setMyFoodEntry({});
  };

  const handleRemoveMyFood = (index) => {
    const updated = [...myFoodList];
    updated.splice(index, 1);
    setMyFoodList(updated);
  };

  // Save My Foods into meals context (same as FoodSearch does)
  const handleSaveMyFoodToMeals = () => {
    if (myFoodList.length === 0) return;

    const updatedMeals = { ...(meals || {}) };
    if (!Array.isArray(updatedMeals[selectedMealType])) {
      updatedMeals[selectedMealType] = [];
    }

    const convertedFoods = myFoodList.map((item) => ({
      name: item.foodName,
      calories: parseInt(item.calories, 10) || 0,
      protein: parseInt(item.protein, 10) || 0,
      carbs: parseInt(item.carbs, 10) || 0,
      fat: parseInt(item.fat, 10) || 0,
      sodium: parseInt(item.sodium, 10) || 0,
      sugar: parseInt(item.sugar, 10) || 0,
    }));

    updatedMeals[selectedMealType] = [
      ...updatedMeals[selectedMealType],
      ...convertedFoods,
    ];

    setMeals(updatedMeals);
    setMyFoodList([]); // clear
    setActiveTab("Food Diary"); // switch back to diary
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="relative flex justify-between items-center bg-[#1D2D44] px-6 py-3 shadow-lg">
        <div className="relative flex gap-6 ml-220">
          {["Food Diary", "My Foods"].map((tab) => (
            <div key={tab} className="relative">
              <button
                type="button"
                onClick={() => setActiveTab(tab)}
                className="px-4 py-2 font-semibold text-white transition-all duration-300 hover:scale-105"
              >
                {tab}
              </button>
              {activeTab === tab && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 right-0 bottom-0 h-1 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FFD93D]"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Food Diary Tab */}
      {activeTab === "Food Diary" && (
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 mt-6">
          <h2 className="text-2xl font-bold text-[#1D2D44] mb-4">
            Your Food Diary For: {selectedDate}
          </h2>

          {mealKeys.map((mealType) => {
            const items = (meals && meals[mealType]) || [];
            return (
              <div key={mealType} className="mb-8">
                <h3 className="text-xl font-semibold capitalize mb-2">
                  {mealType}
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm border border-gray-200">
                    <thead className="bg-[#1D2D44] text-white">
                      <tr>
                        <th className="p-2">Name</th>
                        <th className="p-2">Calories</th>
                        <th className="p-2">Carbs (g)</th>
                        <th className="p-2">Fat (g)</th>
                        <th className="p-2">Protein (g)</th>
                        <th className="p-2">Sodium (mg)</th>
                        <th className="p-2">Sugar (g)</th>
                        <th className="p-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.length > 0 ? (
                        items.map((item, index) => (
                          <tr
                            key={index}
                            className="border-b hover:bg-gray-50 transition"
                          >
                            <td className="p-2 text-center">{item.name}</td>
                            <td className="p-2 text-center">{item.calories}</td>
                            <td className="p-2 text-center">{item.carbs}</td>
                            <td className="p-2 text-center">{item.fat}</td>
                            <td className="p-2 text-center">{item.protein}</td>
                            <td className="p-2 text-center">{item.sodium}</td>
                            <td className="p-2 text-center">{item.sugar}</td>
                            <td className="p-2 text-center">
                              <button
                                type="button"
                                onClick={() => handleRemove(mealType, index)}
                                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="8"
                            className="text-center text-gray-400 py-2"
                          >
                            No items added yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Buttons */}
                <div className="flex space-x-4 mt-3">
                  <button
                    type="button"
                    onClick={() => handleNavigateToSearch(mealType)}
                    className="px-4 py-2 bg-[#1D2D44] text-white rounded-lg hover:bg-[#163153] transition"
                  >
                    Add Food
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      navigate("/quicktool", {
                        state: { mealType, selectedDate },
                      })
                    }
                    className="px-4 py-2 bg-[#FF6B6B] text-white rounded-lg hover:bg-[#FF4B4B] transition"
                  >
                    Quick Tool
                  </button>
                </div>
              </div>
            );
          })}

          {/* Overall Totals */}
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border border-gray-200 text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2"></th>
                  <th className="p-2">Calories</th>
                  <th className="p-2">Carbs (g)</th>
                  <th className="p-2">Fat (g)</th>
                  <th className="p-2">Protein (g)</th>
                  <th className="p-2">Sodium (mg)</th>
                  <th className="p-2">Sugar (g)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 font-semibold">Totals</td>
                  <td className="p-2 text-center">{totals.calories}</td>
                  <td className="p-2 text-center">{totals.carbs}</td>
                  <td className="p-2 text-center">{totals.fat}</td>
                  <td className="p-2 text-center">{totals.protein}</td>
                  <td className="p-2 text-center">{totals.sodium}</td>
                  <td className="p-2 text-center">{totals.sugar}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Daily Goal</td>
                  <td className="p-2 text-center">
                    {dailyGoal?.calories ?? 0}
                  </td>
                  <td className="p-2 text-center">{dailyGoal?.carbs ?? 0}</td>
                  <td className="p-2 text-center">{dailyGoal?.fat ?? 0}</td>
                  <td className="p-2 text-center">{dailyGoal?.protein ?? 0}</td>
                  <td className="p-2 text-center">{dailyGoal?.sodium ?? 0}</td>
                  <td className="p-2 text-center">{dailyGoal?.sugar ?? 0}</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="p-2 font-semibold">Remaining</td>
                  <td className="p-2 text-center">
                    {(dailyGoal?.calories ?? 0) - totals.calories}
                  </td>
                  <td className="p-2 text-center">
                    {(dailyGoal?.carbs ?? 0) - totals.carbs}
                  </td>
                  <td className="p-2 text-center">
                    {(dailyGoal?.fat ?? 0) - totals.fat}
                  </td>
                  <td className="p-2 text-center">
                    {(dailyGoal?.protein ?? 0) - totals.protein}
                  </td>
                  <td className="p-2 text-center">
                    {(dailyGoal?.sodium ?? 0) - totals.sodium}
                  </td>
                  <td className="p-2 text-center">
                    {(dailyGoal?.sugar ?? 0) - totals.sugar}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* My Foods Tab */}
      {activeTab === "My Foods" && (
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 mt-6">
          <h2 className="text-2xl font-bold text-[#1D2D44] mb-4">
            My Foods: Create Your Own Entries
          </h2>
          <p className="text-gray-600 mb-6">
            Add homemade dishes and their calorie/nutrient information.
          </p>

          {/* Select Meal Type */}
          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-1">
              Select Meal
            </label>
            <select
              value={selectedMealType}
              onChange={(e) => setSelectedMealType(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D2D44]"
            >
              {["Breakfast", "Lunch", "Dinner"].map((meal) => (
                <option key={meal} value={meal}>
                  {meal}
                </option>
              ))}
            </select>
          </div>

          {/* Add New Food Entry */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {[
              { label: "Food Name", name: "foodName" },
              { label: "Calories", name: "calories" },
              { label: "Protein (g)", name: "protein" },
              { label: "Carbs (g)", name: "carbs" },
              { label: "Fat (g)", name: "fat" },
              { label: "Sodium (mg)", name: "sodium" },
              { label: "Sugar (g)", name: "sugar" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-gray-700 font-semibold mb-1">
                  {field.label}
                </label>
                <input
                  type={field.name === "foodName" ? "text" : "number"}
                  name={field.name}
                  value={myFoodEntry[field.name] || ""}
                  onChange={handleMyFoodChange}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
            ))}
          </div>

          <div className="flex gap-2 mb-6">
            <button
              type="button"
              onClick={handleAddMyFood}
              className="px-6 py-3 bg-[#1D2D44] text-white rounded-lg hover:bg-[#163153] transition"
            >
              Add Entry
            </button>
            <button
              type="button"
              onClick={handleSaveMyFoodToMeals}
              className="px-6 py-3 bg-[#FF6B6B] text-white rounded-lg hover:bg-[#FF4B4B] transition"
            >
              Save to Meals
            </button>
          </div>

          {/* My Food List Table */}
          {myFoodList.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200">
                <thead className="bg-[#1D2D44] text-white">
                  <tr>
                    <th className="p-2">Name</th>
                    <th className="p-2">Calories</th>
                    <th className="p-2">Protein</th>
                    <th className="p-2">Carbs</th>
                    <th className="p-2">Fat</th>
                    <th className="p-2">Sodium</th>
                    <th className="p-2">Sugar</th>
                    <th className="p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {myFoodList.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="p-2 text-center">{item.foodName}</td>
                      <td className="p-2 text-center">{item.calories}</td>
                      <td className="p-2 text-center">{item.protein}</td>
                      <td className="p-2 text-center">{item.carbs}</td>
                      <td className="p-2 text-center">{item.fat}</td>
                      <td className="p-2 text-center">{item.sodium}</td>
                      <td className="p-2 text-center">{item.sugar}</td>
                      <td className="p-2 text-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveMyFood(index)}
                          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FoodDiary;
