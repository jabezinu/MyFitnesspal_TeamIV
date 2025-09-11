import React, { useState } from "react";
import { motion } from "framer-motion";
import calloglogo from "../../assets/img/calloglogo.png";

const CardioSearch = ({ onAddToDiary }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);

  // Search function using WGER API
  const handleSearch = async () => {
    if (!query) return;
    try {
      const response = await fetch(
        `https://wger.de/api/v2/exercise/?language=2&category=11&limit=20&search=${encodeURIComponent(
          query
        )}`
      );
      const data = await response.json();
      // Map to format: name, minutes default 30, calories estimated default 200
      const formattedResults = data.results.map((ex) => ({
        id: ex.id,
        name: ex.name,
        minutes: 30,
        calories: 200,
        checked: false,
      }));
      setResults(formattedResults);
      setSelectedExercise(null);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch exercises");
    }
  };

  const handleCheck = (index) => {
    const newResults = [...results];
    newResults[index].checked = !newResults[index].checked;
    setResults(newResults);
  };

  const handleSelectExercise = (exercise) => {
    setSelectedExercise(exercise);
  };

  const handleMinutesChange = (e) => {
    if (!selectedExercise) return;
    const minutes = parseInt(e.target.value) || 0;
    const calories = Math.round((minutes / 30) * 200); // simple estimation
    setSelectedExercise({ ...selectedExercise, minutes, calories });
  };

  const handleAddChecked = () => {
    const exercisesToAdd = [];
    results.forEach((ex) => {
      if (ex.checked) {
        exercisesToAdd.push(ex);
      }
    });
    if (selectedExercise && !exercisesToAdd.includes(selectedExercise)) {
      exercisesToAdd.push(selectedExercise);
    }

    if (exercisesToAdd.length === 0) {
      alert("No exercises selected!");
      return;
    }

    onAddToDiary(exercisesToAdd); // send to parent (Exercise Diary)
    alert(`${exercisesToAdd.length} exercise(s) added to diary!`);
    setResults([]);
    setSelectedExercise(null);
    setQuery("");
  };

  return (
    <div className="min-h-screen bg-white text-[#1D2D44] p-4">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 shadow-lg bg-gradient-to-r from-[#1D2D44] to-[#163153] text-white rounded-xl">
        <img src={calloglogo} alt="Logo" className="h-10 w-auto" />
      </nav>

     
      <div className="max-w-4xl mx-auto mt-10 bg-white rounded-3xl p-6 shadow-xl border border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Search Cardio Exercises</h2>
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Type exercise name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
          />
          <button
            onClick={handleSearch}
            className="px-5 py-3 bg-[#1D2D44] text-white rounded-lg font-semibold hover:opacity-90 shadow-md"
          >
            Search
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <motion.div layout className="space-y-3">
            {results.map((exercise, idx) => (
              <div
                key={exercise.id}
                className="flex items-center justify-between p-4 rounded-xl shadow hover:shadow-lg transition-all border border-gray-100 cursor-pointer"
                onClick={() => handleSelectExercise(exercise)}
              >
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={exercise.checked}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleCheck(idx);
                    }}
                    className="h-5 w-5 accent-[#FF6B6B]"
                  />
                  <span className="font-semibold text-lg">{exercise.name}</span>
                </div>
              </div>
            ))}
          </motion.div>
        )}

       
        {selectedExercise && (
          <div className="mt-6 p-4 border rounded-xl shadow bg-gray-50">
            <h3 className="text-xl font-semibold mb-3">
              {selectedExercise.name}
            </h3>
            <div className="flex items-center gap-4">
              <label>
                Minutes:
                <input
                  type="number"
                  value={selectedExercise.minutes}
                  onChange={handleMinutesChange}
                  className="ml-2 p-2 border rounded w-24"
                />
              </label>
              <span>Estimated Calories: {selectedExercise.calories} kcal</span>
            </div>
          </div>
        )}

       
        {results.length > 0 && (
          <div className="mt-6 text-right">
            <button
              onClick={handleAddChecked}
              className="px-6 py-3 bg-[#1D2D44] text-white rounded-lg font-semibold hover:opacity-90 shadow-md"
            >
              Add Checked
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardioSearch;
