
export const generateUserData = () => {
  const users = []
  const names = [
    "Sofiya yasin",
    "BaedeMariam",
    "Jabez shiferew",
    "Leta",
    "Mossisa",
   
  ]
  for (let i = 0; i < 5; i++) {
    users.push({
      id: `sofi_${i + 1}`,
      name: names[Math.floor(Math.random() * names.length)],
      email: `sofi${i + 1}sofi@.com`,
      joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      lastActive: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      status: Math.random() > 0.1 ? "active" : "inactive",
      totalCalories: Math.floor(Math.random() * 50000) + 10000,
      totalWorkouts: Math.floor(Math.random() * 100) + 10,
      currentWeight: Math.floor(Math.random() * 50) + 120,
      goalWeight: Math.floor(Math.random() * 40) + 110,
    })
  }

  return users
}

export const generateSystemStats = () => {
  return {
    totalUsers: 1247,
    activeUsers: 892,
    totalFoods: 15420,
    totalExercises: 2340,
    totalCaloriesLogged: 2847392,
    totalWorkoutsLogged: 18493,
    avgDailyActiveUsers: 234,
    newUsersThisMonth: 67,
    retentionRate: 78.5,
    avgSessionDuration: 12.4,
  }
}

export const generateFoodDatabase = () => {
  const foods = []
  const foodNames = [
    "Apple",
    "Banana",
    "Chicken Breast",
    "Brown Rice",
    "Sweet Potato",
    "Eggs",
    "Avocado",
    
  ]

  for (let i = 0; i < 10; i++) {
    foods.push({
      id: `food_${i + 1}`,
      name: foodNames[Math.floor(Math.random() * foodNames.length)] + ` ${i + 1}`,
      category: ["Protein", "Carbs", "Vegetables", "Fruits", "Dairy", "Fats"][Math.floor(Math.random() * 6)],
      calories: Math.floor(Math.random() * 400) + 50,
      protein: Math.floor(Math.random() * 30) + 1,
      carbs: Math.floor(Math.random() * 50) + 1,
      fat: Math.floor(Math.random() * 20) + 1,
      servingSize: "100g",
      addedBy: Math.random() > 0.7 ? "admin" : "user",
      dateAdded: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      verified: Math.random() > 0.3,
    })
  }

  return foods
}

export const generateExerciseDatabase = () => {
  const exercises = []
  const exerciseNames = [
    "Push-ups",
    "Squats",
    "Running",
    "Cycling",
    "Swimming",
    
  ]

  for (let i = 0; i < 5; i++) {
    exercises.push({
      id: `exercise_${i + 1}`,
      name: exerciseNames[Math.floor(Math.random() * exerciseNames.length)] + ` ${i + 1}`,
      category: ["Cardio", "Strength", "Flexibility", "Sports"][Math.floor(Math.random() * 4)],
      caloriesPerMinute: Math.floor(Math.random() * 15) + 3,
      muscleGroups: ["Chest", "Back", "Legs", "Arms", "Core", "Full Body"][Math.floor(Math.random() * 6)],
      equipment: ["None", "Dumbbells", "Barbell", "Machine", "Cardio Equipment"][Math.floor(Math.random() * 5)],
      difficulty: ["Beginner", "Intermediate", "Advanced"][Math.floor(Math.random() * 3)],
      addedBy: Math.random() > 0.8 ? "admin" : "user",
      dateAdded: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      verified: Math.random() > 0.2,
    })
  }

  return exercises
}
