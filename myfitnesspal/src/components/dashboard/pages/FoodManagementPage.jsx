
import { useState, useEffect } from "react"
import { generateFoodDatabase } from "../../lib/admin"; 
export const FoodManagementPage = () => {
  const [foods, setFoods] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [showAddForm, setShowAddForm] = useState(false)
  const [newFood, setNewFood] = useState({
    name: "",
    category: "Protein",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    servingSize: "100g",
  })

  useEffect(() => {
    setFoods(generateFoodDatabase())
  }, [])

  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || food.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const handleAddFood = (e) => {
    e.preventDefault()
    const food = {
      id: `food_${Date.now()}`,
      ...newFood,
      calories: Number.parseInt(newFood.calories),
      protein: Number.parseInt(newFood.protein),
      carbs: Number.parseInt(newFood.carbs),
      fat: Number.parseInt(newFood.fat),
      addedBy: "admin",
      dateAdded: new Date().toISOString().split("T")[0],
      verified: true,
    }
    setFoods([food, ...foods])
    setNewFood({
      name: "",
      category: "Protein",
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
      servingSize: "100g",
    })
    setShowAddForm(false)
  }

  const handleDeleteFood = (foodId) => {
    if (window.confirm("Are you sure you want to delete this food item?")) {
      setFoods(foods.filter((food) => food.id !== foodId))
    }
  }

  const handleVerifyFood = (foodId) => {
    setFoods(foods.map((food) => (food.id === foodId ? { ...food, verified: !food.verified } : food)))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Food Database Management</h1>
          <p className="text-muted-foreground mt-2">Manage food items and nutritional information</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Add New Food
        </button>
      </div>

      {showAddForm && (
        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Add New Food Item</h3>
          <form onSubmit={handleAddFood} className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Food Name</label>
              <input
                type="text"
                required
                value={newFood.name}
                onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Category</label>
              <select
                value={newFood.category}
                onChange={(e) => setNewFood({ ...newFood, category: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="Protein">Protein</option>
                <option value="Carbs">Carbs</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Dairy">Dairy</option>
                <option value="Fats">Fats</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Calories (per 100g)</label>
              <input
                type="number"
                required
                value={newFood.calories}
                onChange={(e) => setNewFood({ ...newFood, calories: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Protein (g)</label>
              <input
                type="number"
                required
                value={newFood.protein}
                onChange={(e) => setNewFood({ ...newFood, protein: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Carbs (g)</label>
              <input
                type="number"
                required
                value={newFood.carbs}
                onChange={(e) => setNewFood({ ...newFood, carbs: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Fat (g)</label>
              <input
                type="number"
                required
                value={newFood.fat}
                onChange={(e) => setNewFood({ ...newFood, fat: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              />
            </div>
            <div className="md:col-span-2 flex space-x-3">
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Add Food
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-border rounded-md hover:bg-muted"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

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
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Food
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Nutrition (per 100g)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredFoods.slice(0, 20).map((food) => (
                <tr key={food.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-foreground">{food.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Added {new Date(food.dateAdded).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {food.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-foreground">
                      <div>{food.calories} cal</div>
                      <div className="text-muted-foreground">
                        P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        food.verified ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {food.verified ? "Verified" : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleVerifyFood(food.id)}
                        className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                      >
                        {food.verified ? "Unverify" : "Verify"}
                      </button>
                      <button
                        onClick={() => handleDeleteFood(food.id)}
                        className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
