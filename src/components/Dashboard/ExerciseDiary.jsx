import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import calloglogo from "../../assets/img/calloglogo.png";

const ExerciseDiary = ({ selectedDate }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Exercise Diary");

  // Dummy data (empty initially, will be filled from search pages)
  const [cardioData, setCardioData] = useState([]);
  const [strengthData, setStrengthData] = useState([]);

  // Exercise notes
  const [exerciseNotes, setExerciseNotes] = useState("");

  // Totals
  const dailyTotal = cardioData.reduce(
    (acc, cur) => acc.calories + acc.calories,
    0
  ); // initially 0
  const weeklyTotal = 0;
  const weeklyGoal = 3500;

  return (
    <div className="min-h-screen bg-white text-[#1D2D44]">
      {/* Navbar */}
      <nav className="relative flex justify-between items-center bg-[#1D2D44] px-6 py-3 shadow-lg">
        <div className="relative flex gap-6 ml-160">
          {["Exercise Diary", "Exercise Database", "My Exercises"].map(
            (tab) => (
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
            )
          )}
        </div>
      </nav>

      {/* Exercise Diary Tab */}
      {activeTab === "Exercise Diary" && (
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6 mt-6">
          <h2 className="text-2xl font-bold text-[#1D2D44] mb-6">
            Your Exercise Diary For: {selectedDate}
          </h2>

          {/* Cardiovascular Training */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-3">
              Cardiovascular Training
            </h3>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  className="px-5 py-2 bg-[#1D2D44] text-white rounded-lg hover:bg-[#163153]"
                  onClick={() => navigate("/exercisesearch")}
                >
                  Add Exercise
                </button>
                <button
                  className="px-5 py-2 bg-[#FFD93D] text-[#1D2D44] rounded-lg hover:bg-yellow-400"
                  onClick={() => navigate("/cardioquicktool")}
                >
                  Quick Tool
                </button>
              </div>

              {/* Cardio Table */}
              <div className="flex-1">
                <table className="w-full border rounded-lg shadow-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-3 text-left">Minutes</th>
                      <th className="p-3 text-left">Calories Burned</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cardioData.length === 0 ? (
                      <tr>
                        <td
                          colSpan="2"
                          className="p-3 text-center text-gray-400"
                        >
                          No exercises added yet.
                        </td>
                      </tr>
                    ) : (
                      cardioData.map((row, idx) => (
                        <tr key={idx} className="border-t">
                          <td className="p-3">{row.minutes}</td>
                          <td className="p-3">{row.calories}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>

                {/* Totals */}
                <div className="mt-4 flex justify-between text-sm font-semibold">
                  <span>Daily Total: {dailyTotal} kcal</span>
                  <span>Weekly Total: {weeklyTotal} kcal</span>
                  <span>Goal: {weeklyGoal} kcal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Strength Training */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-3">Strength Training</h3>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  className="px-5 py-2 bg-[#1D2D44] text-white rounded-lg hover:bg-[#163153]"
                  onClick={() => navigate("/strengthsearch")}
                >
                  Add Exercise
                </button>
                <button
                  className="px-5 py-2 bg-[#FFD93D] text-[#1D2D44] rounded-lg hover:bg-yellow-400"
                  onClick={() => navigate("/strengthquicktool")}
                >
                  Quick Tool
                </button>
              </div>

              {/* Strength Table */}
              <div className="flex-1">
                <table className="w-full border rounded-lg shadow-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-3 text-left">Sets</th>
                      <th className="p-3 text-left">Reps/Set</th>
                      <th className="p-3 text-left">Weight/Set (kg)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {strengthData.length === 0 ? (
                      <tr>
                        <td
                          colSpan="3"
                          className="p-3 text-center text-gray-400"
                        >
                          No exercises added yet.
                        </td>
                      </tr>
                    ) : (
                      strengthData.map((row, idx) => (
                        <tr key={idx} className="border-t">
                          <td className="p-3">{row.sets}</td>
                          <td className="p-3">{row.reps}</td>
                          <td className="p-3">{row.weight}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Exercise Notes */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3">Exercise Notes</h3>
            <textarea
              placeholder="Write your notes here..."
              value={exerciseNotes}
              onChange={(e) => setExerciseNotes(e.target.value)}
              className="w-full p-3 border rounded-lg h-28 mb-3"
            ></textarea>
            <button
              onClick={() => {
                console.log("Saved Notes:", exerciseNotes);
                alert("Notes saved successfully!");
              }}
              className="px-5 py-2 bg-[#1D2D44] text-white rounded-lg hover:bg-[#163153] shadow-md"
            >
              Save Notes
            </button>
          </div>
        </div>
      )}

      {/* Exercise Database Tab */}
      {activeTab === "Exercise Database" && (
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 mt-6">
          <h2 className="text-2xl font-bold text-[#1D2D44] mb-4">
            Exercise Database
          </h2>

          {/* Search Input + Button */}
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Type exercise name..."
              className="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D2D44]"
            />
            <button className="px-6 py-3 bg-[#1D2D44] text-white rounded-lg font-semibold hover:opacity-90 shadow-md">
              Search
            </button>
          </div>
        </div>
      )}

      {/* My Exercises Tab */}
      {activeTab === "My Exercises" && (
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 mt-6">
          <h2 className="text-2xl font-bold text-[#1D2D44] mb-4">
            My Exercises
          </h2>
          <p className="text-gray-600 mb-6">
            Create and save your custom exercises.
          </p>

          {/* Exercise Form */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Exercise Name"
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D2D44]"
            />
            <textarea
              placeholder="Description"
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D2D44] resize-none"
              rows={3}
            />
            <div className="flex gap-4">
              <input
                type="number"
                placeholder="Minutes"
                className="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D2D44]"
              />
              <input
                type="number"
                placeholder="Calories Burned"
                className="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D2D44]"
              />
            </div>

            <button className="px-6 py-3 bg-[#1D2D44] text-white rounded-lg font-semibold hover:opacity-90 shadow-md">
              Save Exercise
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseDiary;
