import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMeals } from "../../context/MealsContext";

const QuickTool = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { meals, setMeals } = useMeals();

  const { mealType: passedMealType } = location.state || {};
  const [mealType, setMealType] = useState(passedMealType || "Breakfast");

  const [formData, setFormData] = useState({
    name: "",
    calories: "",
    carbs: "",
    fat: "",
    protein: "",
    sodium: "",
    sugar: "",
  });

  useEffect(() => {
    if (passedMealType) setMealType(passedMealType);
  }, [passedMealType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddFood = (e) => {
    e.preventDefault();

    if (!formData.name) return alert("Please enter a food name");

    const newFood = {
      name: formData.name,
      calories: parseInt(formData.calories) || 0,
      carbs: parseInt(formData.carbs) || 0,
      fat: parseInt(formData.fat) || 0,
      protein: parseInt(formData.protein) || 0,
      sodium: parseInt(formData.sodium) || 0,
      sugar: parseInt(formData.sugar) || 0,
    };

    const updatedMeals = { ...meals };
    if (!updatedMeals[mealType]) updatedMeals[mealType] = [];
    updatedMeals[mealType] = [...updatedMeals[mealType], newFood];
    setMeals(updatedMeals);

    // Navigate back to FoodDiary
    navigate("/food-diary");
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold text-[#1D2D44] mb-4">Quick Add Meal</h2>

      <form onSubmit={handleAddFood} className="space-y-4">
        <select
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
          className="w-full p-2 border rounded-lg"
        >
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>

        <input
          type="text"
          name="name"
          placeholder="Food Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="calories"
            placeholder="Calories"
            value={formData.calories}
            onChange={handleChange}
          />
          <input
            type="number"
            name="carbs"
            placeholder="Carbs (g)"
            value={formData.carbs}
            onChange={handleChange}
          />
          <input
            type="number"
            name="fat"
            placeholder="Fat (g)"
            value={formData.fat}
            onChange={handleChange}
          />
          <input
            type="number"
            name="protein"
            placeholder="Protein (g)"
            value={formData.protein}
            onChange={handleChange}
          />
          <input
            type="number"
            name="sodium"
            placeholder="Sodium (mg)"
            value={formData.sodium}
            onChange={handleChange}
          />
          <input
            type="number"
            name="sugar"
            placeholder="Sugar (g)"
            value={formData.sugar}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-[#1D2D44] text-white rounded-lg hover:bg-[#163153] transition"
        >
          Add to {mealType}
        </button>
      </form>
    </div>
  );
};

export default QuickTool;
