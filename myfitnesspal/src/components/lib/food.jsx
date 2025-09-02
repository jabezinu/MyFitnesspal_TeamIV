/**
 * @typedef {Object} FoodItem
 * @property {string} id
 * @property {string} name
 * @property {string} [brand]
 * @property {number} calories
 * @property {number} protein
 * @property {number} carbs
 * @property {number} fat
 * @property {number} [fiber]
 * @property {number} [sugar]
 * @property {number} [sodium]
 * @property {string} servingSize
 * @property {string} servingUnit
 * @property {string} category
 * @property {boolean} [isCustom]
 * @property {string} [userId]
 */

/**
 * @typedef {Object} MealEntry
 * @property {string} id
 * @property {string} foodId
 * @property {string} foodName
 * @property {number} servings
 * @property {number} calories
 * @property {number} protein
 * @property {number} carbs
 * @property {number} fat
 * @property {"breakfast" | "lunch" | "dinner" | "snack"} mealType
 * @property {string} date
 * @property {string} userId
 */

/**
 * @typedef {Object} DailyNutrition
 * @property {string} date
 * @property {number} totalCalories
 * @property {number} totalProtein
 * @property {number} totalCarbs
 * @property {number} totalFat
 * @property {Object} meals
 * @property {MealEntry[]} meals.breakfast
 * @property {MealEntry[]} meals.lunch
 * @property {MealEntry[]} meals.dinner
 * @property {MealEntry[]} meals.snack
 */

// Mock food database
export const mockFoodDatabase = [
  {
    id: "1",
    name: "Chicken Breast",
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    fiber: 0,
    servingSize: "100",
    servingUnit: "g",
    category: "Meat & Poultry",
  },
  {
    id: "2",
    name: "Brown Rice",
    calories: 111,
    protein: 2.6,
    carbs: 23,
    fat: 0.9,
    fiber: 1.8,
    servingSize: "100",
    servingUnit: "g",
    category: "Grains",
  },
  {
    id: "3",
    name: "Broccoli",
    calories: 34,
    protein: 2.8,
    carbs: 7,
    fat: 0.4,
    fiber: 2.6,
    servingSize: "100",
    servingUnit: "g",
    category: "Vegetables",
  },
  {
    id: "4",
    name: "Banana",
    calories: 89,
    protein: 1.1,
    carbs: 23,
    fat: 0.3,
    fiber: 2.6,
    sugar: 12,
    servingSize: "1",
    servingUnit: "medium",
    category: "Fruits",
  },
  {
    id: "5",
    name: "Greek Yogurt",
    brand: "Plain",
    calories: 59,
    protein: 10,
    carbs: 3.6,
    fat: 0.4,
    servingSize: "100",
    servingUnit: "g",
    category: "Dairy",
  },
  {
    id: "6",
    name: "Almonds",
    calories: 579,
    protein: 21,
    carbs: 22,
    fat: 50,
    fiber: 12,
    servingSize: "100",
    servingUnit: "g",
    category: "Nuts & Seeds",
  },
  {
    id: "7",
    name: "Salmon",
    calories: 208,
    protein: 20,
    carbs: 0,
    fat: 13,
    servingSize: "100",
    servingUnit: "g",
    category: "Fish & Seafood",
  },
  {
    id: "8",
    name: "Sweet Potato",
    calories: 86,
    protein: 1.6,
    carbs: 20,
    fat: 0.1,
    fiber: 3,
    servingSize: "100",
    servingUnit: "g",
    category: "Vegetables",
  },
]

export class FoodService {
  async searchFoods(query) {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    if (!query.trim()) return mockFoodDatabase.slice(0, 8)

    return mockFoodDatabase.filter(
      (food) =>
        food.name.toLowerCase().includes(query.toLowerCase()) ||
        food.category.toLowerCase().includes(query.toLowerCase()) ||
        (food.brand && food.brand.toLowerCase().includes(query.toLowerCase())),
    )
  }

  async addCustomFood(food) {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newFood = {
      ...food,
      id: Date.now().toString(),
      isCustom: true,
    }

    return newFood
  }

  async addMealEntry(entry) {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    const newEntry = {
      ...entry,
      id: Date.now().toString(),
    }

    return newEntry
  }

  async getDailyNutrition(date, userId) {
    // Simulate API call with mock data
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Mock meal entries for today
    const mockMeals = {
      date,
      totalCalories: 1250,
      totalProtein: 95,
      totalCarbs: 120,
      totalFat: 45,
      meals: {
        breakfast: [
          {
            id: "1",
            foodId: "4",
            foodName: "Banana",
            servings: 1,
            calories: 89,
            protein: 1.1,
            carbs: 23,
            fat: 0.3,
            mealType: "breakfast",
            date,
            userId,
          },
          {
            id: "2",
            foodId: "5",
            foodName: "Greek Yogurt",
            servings: 1.5,
            calories: 89,
            protein: 15,
            carbs: 5.4,
            fat: 0.6,
            mealType: "breakfast",
            date,
            userId,
          },
        ],
        lunch: [
          {
            id: "3",
            foodId: "1",
            foodName: "Chicken Breast",
            servings: 1.2,
            calories: 198,
            protein: 37,
            carbs: 0,
            fat: 4.3,
            mealType: "lunch",
            date,
            userId,
          },
          {
            id: "4",
            foodId: "2",
            foodName: "Brown Rice",
            servings: 0.8,
            calories: 89,
            protein: 2.1,
            carbs: 18,
            fat: 0.7,
            mealType: "lunch",
            date,
            userId,
          },
        ],
        dinner: [
          {
            id: "5",
            foodId: "7",
            foodName: "Salmon",
            servings: 1,
            calories: 208,
            protein: 20,
            carbs: 0,
            fat: 13,
            mealType: "dinner",
            date,
            userId,
          },
          {
            id: "6",
            foodId: "3",
            foodName: "Broccoli",
            servings: 1.5,
            calories: 51,
            protein: 4.2,
            carbs: 10.5,
            fat: 0.6,
            mealType: "dinner",
            date,
            userId,
          },
        ],
        snack: [
          {
            id: "7",
            foodId: "6",
            foodName: "Almonds",
            servings: 0.2,
            calories: 116,
            protein: 4.2,
            carbs: 4.4,
            fat: 10,
            mealType: "snack",
            date,
            userId,
          },
        ],
      },
    }

    return mockMeals
  }
}

export const foodService = new FoodService()
