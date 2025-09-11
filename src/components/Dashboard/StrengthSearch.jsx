import React, { useState } from "react";
import { motion } from "framer-motion";
import calloglogo from "../../assets/img/calloglogo.png";

const StrengthSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Dummy search function
  const handleSearch = () => {
    const dummyResults = [
      { name: "Bench Press", sets: 3, reps: 12, weight: 50, checked: false },
      { name: "Squats", sets: 4, reps: 8, weight: 80, checked: false },
      { name: "Deadlift", sets: 3, reps: 10, weight: 100, checked: false },
    ];
    const filtered = dummyResults.filter((r) =>
      r.name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  const handleCheck = (index) => {
    const newResults = [...results];
    newResults[index].checked = !newResults[index].checked;
    setResults(newResults);
  };

  const handleAddChecked = () => {
    const checkedExercises = results.filter((r) => r.checked);
    if (checkedExercises.length === 0) {
      alert("No exercises selected!");
      return;
    }
    console.log("Adding to diary:", checkedExercises);
    alert(`${checkedExercises.length} exercise(s) added to diary!`);
    // Here you can call API or context to add them to ExerciseDiary
  };

  return (
    <div className="min-h-screen bg-white text-[#1D2D44]">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 shadow-lg bg-gradient-to-r from-[#1D2D44] to-[#163153] text-white">
        <img src={calloglogo} alt="Logo" className="h-10 w-auto" />
      </nav>

      {/* Search Section */}
      <div className="max-w-4xl mx-auto mt-10 bg-white rounded-3xl p-6 shadow-xl border border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Search Strength Exercises</h2>

        {/* Search Input */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Type exercise name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 p-3 border-2 border-transparent rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] bg-gradient-to-r from-white via-white to-white placeholder-gray-400 transition-all duration-300 hover:shadow-lg"
          />
          <button
            onClick={handleSearch}
            className="px-5 py-3 bg-gradient-to-r from-[#1D2D44] to-[#163153] text-white rounded-lg font-semibold hover:opacity-90 shadow-md"
          >
            Search
          </button>
        </div>

        {/* Results Table */}
        {results.length > 0 && (
          <motion.div layout className="space-y-3">
            {results.map((exercise, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 rounded-xl shadow hover:shadow-lg transition-all border border-gray-100 bg-gradient-to-r from-white via-gray-50 to-white"
              >
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={exercise.checked}
                    onChange={() => handleCheck(idx)}
                    className="h-5 w-5 accent-[#FF6B6B]"
                  />
                  <span className="font-semibold text-lg">{exercise.name}</span>
                </div>
                <div className="flex gap-6 font-medium">
                  <span>{exercise.sets} sets</span>
                  <span>{exercise.reps} reps</span>
                  <span>{exercise.weight} kg</span>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Add Checked Button */}
        {results.length > 0 && (
          <div className="mt-6 text-right">
            <button
              onClick={handleAddChecked}
              className="px-6 py-3 bg-gradient-to-r from-[#1D2D44] to-[#163153] text-white rounded-lg font-semibold hover:opacity-90 shadow-md"
            >
              Add Checked
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StrengthSearch;
