import { useState, useEffect } from "react";
import { generateFoodDatabase } from "../../lib/admin"; 

export const FoodManagementPageUser = () => {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    setFoods(generateFoodDatabase());
  }, []);

  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || food.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Food Database </h1>
        <p className="text-muted-foreground mt-2"> Food items and nutritional information</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search foods..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
        >
          <option value="all">All Categories</option>
          <option value="Protein">Protein</option>
          <option value="Carbs">Carbs</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Fruits">Fruits</option>
          <option value="Dairy">Dairy</option>
          <option value="Fats">Fats</option>
        </select>
      </div>

      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Food</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Nutrition (per 100g)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredFoods.slice(0, 20).map((food) => (
                <tr key={food.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-foreground">{food.name}</div>
                    <div className="text-sm text-muted-foreground">Added {new Date(food.dateAdded).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">{food.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-foreground">
                      <div>{food.calories} cal</div>
                      <div className="text-muted-foreground">P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g</div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};