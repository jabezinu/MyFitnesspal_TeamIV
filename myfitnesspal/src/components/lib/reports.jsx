// Mock data and utilities for reports and analytics

export const generateNutritionData = (days = 30) => {
  const data = []
  const today = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    data.push({
      date: date.toISOString().split("T")[0],
      calories: Math.floor(Math.random() * 500) + 1800,
      protein: Math.floor(Math.random() * 50) + 80,
      carbs: Math.floor(Math.random() * 100) + 150,
      fat: Math.floor(Math.random() * 30) + 50,
      fiber: Math.floor(Math.random() * 15) + 20,
      sugar: Math.floor(Math.random() * 30) + 40,
    })
  }

  return data
}

export const generateExerciseData = (days = 30) => {
  const data = []
  const today = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    data.push({
      date: date.toISOString().split("T")[0],
      caloriesBurned: Math.floor(Math.random() * 400) + 200,
      duration: Math.floor(Math.random() * 60) + 30,
      exercises: Math.floor(Math.random() * 5) + 1,
      cardioMinutes: Math.floor(Math.random() * 45) + 15,
      strengthSets: Math.floor(Math.random() * 20) + 5,
    })
  }

  return data
}

export const generateWeightData = (days = 90) => {
  const data = []
  const today = new Date()
  let baseWeight = 170 + Math.random() * 20

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    // Simulate gradual weight change
    baseWeight += (Math.random() - 0.5) * 0.5

    data.push({
      date: date.toISOString().split("T")[0],
      weight: Math.round(baseWeight * 10) / 10,
      bodyFat: Math.round((Math.random() * 5 + 15) * 10) / 10,
      muscleMass: Math.round((Math.random() * 10 + 40) * 10) / 10,
    })
  }

  return data
}

export const calculateNutritionStats = (data) => {
  if (!data.length) return {}

  const totals = data.reduce(
    (acc, day) => ({
      calories: acc.calories + day.calories,
      protein: acc.protein + day.protein,
      carbs: acc.carbs + day.carbs,
      fat: acc.fat + day.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  )

  return {
    avgCalories: Math.round(totals.calories / data.length),
    avgProtein: Math.round(totals.protein / data.length),
    avgCarbs: Math.round(totals.carbs / data.length),
    avgFat: Math.round(totals.fat / data.length),
    totalDays: data.length,
  }
}

export const calculateExerciseStats = (data) => {
  if (!data.length) return {}

  const totals = data.reduce(
    (acc, day) => ({
      calories: acc.calories + day.caloriesBurned,
      duration: acc.duration + day.duration,
      exercises: acc.exercises + day.exercises,
    }),
    { calories: 0, duration: 0, exercises: 0 },
  )

  return {
    totalCaloriesBurned: totals.calories,
    totalDuration: totals.duration,
    totalExercises: totals.exercises,
    avgCaloriesPerDay: Math.round(totals.calories / data.length),
    avgDurationPerDay: Math.round(totals.duration / data.length),
    activeDays: data.filter((day) => day.exercises > 0).length,
  }
}
