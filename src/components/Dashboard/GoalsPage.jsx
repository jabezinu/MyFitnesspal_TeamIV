import React, { useState } from "react";

const GoalsPage = ({ userGoals, setUserGoals }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserGoals({ ...userGoals, [name]: value });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold mb-4 text-[#1D2D44]">
        Set Your Daily Nutrition Goals
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Calories
          </label>
          <input
            type="number"
            name="calories"
            value={userGoals.calories}
            onChange={handleChange}
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
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Protein (g)
          </label>
          <input
            type="number"
            name="protein"
            value={userGoals.protein}
            onChange={handleChange}
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
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>
      </div>

      <button className="mt-6 px-6 py-2 bg-[#FF6B6B] text-white rounded-lg shadow-md hover:bg-[#FF4B4B] transition">
        Save Goals
      </button>
    </div>
  );
};

export default GoalsPage;
