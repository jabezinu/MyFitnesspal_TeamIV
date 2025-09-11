import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMeals } from "../../context/MealsContext";
import calloglogo from "../../assets/img/calloglogo.png";

const FoodSearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mealType: passedMealType } = location.state || {};
  const { meals, setMeals } = useMeals();

  const [mealType, setMealType] = useState(passedMealType || "Breakfast");
  const [searchTerm, setSearchTerm] = useState("");
  const [foodList, setFoodList] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState({});
  const [loading, setLoading] = useState(false);

  // Toggle checkbox
  const handleCheck = (index) => {
    setSelectedFoods((prev) => ({
      ...prev,
      [index]: { checked: !prev[index]?.checked, qty: prev[index]?.qty || 1 },
    }));
  };

  // Handle quantity change
  const handleQtyChange = (index, value) => {
    setSelectedFoods((prev) => ({
      ...prev,
      [index]: { ...prev[index], qty: parseInt(value) || 1 },
    }));
  };

  // Add checked foods to meals
  const handleAddChecked = () => {
    const updatedMeals = { ...meals };
    if (!updatedMeals[mealType]) updatedMeals[mealType] = [];

    foodList.forEach((food, index) => {
      if (selectedFoods[index]?.checked) {
        const qty = selectedFoods[index].qty || 1;
        const nutriments = food.nutriments || {};

        // Calculate calories
        let calories = 0;
        if (nutriments["energy-kcal_100g"]) {
          calories = nutriments["energy-kcal_100g"];
        } else if (nutriments.energy_100g) {
          calories = nutriments.energy_100g / 4.184;
        }

        updatedMeals[mealType].push({
          name: food.product_name || food.generic_name || "Unknown",
          calories: calories * qty,
          protein: (nutriments.proteins_100g || 0) * qty,
          carbs: (nutriments.carbohydrates_100g || 0) * qty,
          fat: (nutriments.fat_100g || 0) * qty,
          sodium: (nutriments.sodium_100g || 0) * qty,
          sugar: (nutriments.sugars_100g || 0) * qty,
        });
      }
    });

    setMeals(updatedMeals);
    navigate("/food-diary");
  };

  // Delete selected items from list
  const handleDelete = () => {
    const remaining = foodList.filter(
      (_, index) => !selectedFoods[index]?.checked
    );
    setFoodList(remaining);
    setSelectedFoods({});
  };

  // Fetch food data from Open Food Facts API
  const handleSearch = async () => {
    if (!searchTerm) return;
    setLoading(true);
    try {
      const query = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
        searchTerm
      )}&search_simple=1&action=process&json=1`;
      const res = await fetch(query);
      const data = await res.json();
      setFoodList(data.products || []);
      setSelectedFoods({});
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar with Logo */}
      <header className="bg-[#1D2D44] text-white py-3 px-6 flex items-center gap-3 shadow-md">
        <img
          src={calloglogo}
          alt="CallogFit Logo"
          className="h-10 w-10 object-contain"
        />
        <div>
          <h1 className="text-xl font-bold">Food Search</h1>
          <p className="text-sm text-gray-300">
            Track your meals, calories, and nutrients easily
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 mt-6">
        <h2 className="text-xl font-bold mb-2">Add Food to {mealType}</h2>

        {/* Description */}
        <p className="text-gray-600 mb-4">
          Search from our database and add foods to your meal diary. You can
          adjust quantity and check multiple items to add at once.
        </p>

        {/* Search Bar */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Search for food"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D2D44] transition-all"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-[#1D2D44] text-white rounded-lg hover:bg-[#16213b] transition-colors"
          >
            Search
          </button>
        </div>

        {loading && <p className="text-gray-500 mb-4">Searching...</p>}

        {/* Food Table */}
        {foodList.length > 0 ? (
          <table className="w-full border border-gray-200 text-sm mb-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Select</th>
                <th className="p-2">Food</th>
                <th className="p-2">Calories</th>
                <th className="p-2">Protein</th>
                <th className="p-2">Carbs</th>
                <th className="p-2">Fat</th>
                <th className="p-2">Qty</th>
                <th className="p-2">Unit</th>
              </tr>
            </thead>
            <tbody>
              {foodList.map((food, index) => {
                const nutriments = food.nutriments || {};
                let calories = 0;
                if (nutriments["energy-kcal_100g"]) {
                  calories = nutriments["energy-kcal_100g"];
                } else if (nutriments.energy_100g) {
                  calories = nutriments.energy_100g / 4.184;
                }

                return (
                  <tr key={index} className="border-b">
                    <td className="p-2 text-center">
                      <input
                        type="checkbox"
                        checked={!!selectedFoods[index]?.checked}
                        onChange={() => handleCheck(index)}
                      />
                    </td>
                    <td className="p-2">
                      {food.product_name || food.generic_name || "Unknown"}
                    </td>
                    <td className="p-2">{Math.round(calories)}</td>
                    <td className="p-2">
                      {Math.round(nutriments.proteins_100g || 0)}
                    </td>
                    <td className="p-2">
                      {Math.round(nutriments.carbohydrates_100g || 0)}
                    </td>
                    <td className="p-2">
                      {Math.round(nutriments.fat_100g || 0)}
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        min="1"
                        value={selectedFoods[index]?.qty || 1}
                        onChange={(e) => handleQtyChange(index, e.target.value)}
                        className="w-16 p-1 border rounded"
                      />
                    </td>
                    <td className="p-2">serving</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          !loading && (
            <p className="text-gray-500">
              No foods found. Try searching above.
            </p>
          )
        )}

        {/* Buttons */}
        {foodList.length > 0 && (
          <div className="flex gap-2">
            <button
              onClick={handleAddChecked}
              className="px-6 py-3 bg-[#1D2D44] text-white rounded-lg hover:bg-[#16213b] transition-colors"
            >
              Add Checked
            </button>
            <button
              onClick={handleDelete}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Delete From List
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-600 text-center py-3 text-sm mt-auto">
        © 2025 CallogFit • Stay on top of your meals and track your nutrition
      </footer>
    </div>
  );
};

export default FoodSearch;
