/**
 * @typedef {Object} Exercise
 * @property {string} id
 * @property {string} name
 * @property {string} category
 * @property {"cardio" | "strength" | "flexibility" | "sports"} type
 * @property {number} [caloriesPerMinute] - For cardio exercises
 * @property {string} [description]
 * @property {string[]} [instructions]
 * @property {string[]} [muscleGroups]
 * @property {string[]} [equipment]
 * @property {boolean} [isCustom]
 * @property {string} [userId]
 */

/**
 * @typedef {Object} ExerciseSet
 * @property {number} reps
 * @property {number} weight
 * @property {number} [restTime] - seconds
 */

/**
 * @typedef {Object} ExerciseEntry
 * @property {string} id
 * @property {string} exerciseId
 * @property {string} exerciseName
 * @property {"cardio" | "strength"} type
 * @property {string} date
 * @property {string} userId
 * @property {number} [duration] - minutes (cardio specific)
 * @property {number} [caloriesBurned] - cardio specific
 * @property {number} [distance] - cardio specific
 * @property {"km" | "miles"} [distanceUnit] - cardio specific
 * @property {ExerciseSet[]} [sets] - strength specific
 * @property {number} [totalWeight] - strength specific
 * @property {number} [totalReps] - strength specific
 */

/**
 * @typedef {Object} DailyExercise
 * @property {string} date
 * @property {number} totalCaloriesBurned
 * @property {number} totalDuration
 * @property {ExerciseEntry[]} exercises
 */

// Mock exercise database
export const mockExerciseDatabase = [
  // Cardio exercises
  {
    id: "1",
    name: "Running",
    category: "Cardio",
    type: "cardio",
    caloriesPerMinute: 10,
    description: "Outdoor or treadmill running",
    muscleGroups: ["Legs", "Core"],
    equipment: ["None", "Treadmill"],
  },
  {
    id: "2",
    name: "Cycling",
    category: "Cardio",
    type: "cardio",
    caloriesPerMinute: 8,
    description: "Indoor or outdoor cycling",
    muscleGroups: ["Legs", "Core"],
    equipment: ["Bicycle", "Stationary Bike"],
  },
  {
    id: "3",
    name: "Swimming",
    category: "Cardio",
    type: "cardio",
    caloriesPerMinute: 12,
    description: "Swimming laps",
    muscleGroups: ["Full Body"],
    equipment: ["Pool"],
  },
  {
    id: "4",
    name: "Walking",
    category: "Cardio",
    type: "cardio",
    caloriesPerMinute: 4,
    description: "Brisk walking",
    muscleGroups: ["Legs"],
    equipment: ["None"],
  },

  // Strength exercises
  {
    id: "5",
    name: "Bench Press",
    category: "Chest",
    type: "strength",
    description: "Barbell or dumbbell bench press",
    muscleGroups: ["Chest", "Shoulders", "Triceps"],
    equipment: ["Barbell", "Dumbbells", "Bench"],
    instructions: [
      "Lie flat on bench with feet on floor",
      "Grip bar slightly wider than shoulder width",
      "Lower bar to chest with control",
      "Press bar up to starting position",
    ],
  },
  {
    id: "6",
    name: "Squats",
    category: "Legs",
    type: "strength",
    description: "Bodyweight or weighted squats",
    muscleGroups: ["Quadriceps", "Glutes", "Hamstrings"],
    equipment: ["None", "Barbell", "Dumbbells"],
    instructions: [
      "Stand with feet shoulder-width apart",
      "Lower body by bending knees and hips",
      "Keep chest up and knees behind toes",
      "Return to starting position",
    ],
  },
  {
    id: "7",
    name: "Deadlift",
    category: "Back",
    type: "strength",
    description: "Conventional deadlift",
    muscleGroups: ["Back", "Glutes", "Hamstrings"],
    equipment: ["Barbell"],
    instructions: [
      "Stand with feet hip-width apart",
      "Bend at hips and knees to grip bar",
      "Keep back straight and chest up",
      "Lift bar by extending hips and knees",
    ],
  },
  {
    id: "8",
    name: "Push-ups",
    category: "Chest",
    type: "strength",
    description: "Standard push-ups",
    muscleGroups: ["Chest", "Shoulders", "Triceps"],
    equipment: ["None"],
    instructions: [
      "Start in plank position",
      "Lower body until chest nearly touches floor",
      "Push back up to starting position",
      "Keep body in straight line",
    ],
  },
  {
    id: "9",
    name: "Pull-ups",
    category: "Back",
    type: "strength",
    description: "Pull-ups or chin-ups",
    muscleGroups: ["Back", "Biceps"],
    equipment: ["Pull-up Bar"],
    instructions: [
      "Hang from bar with arms extended",
      "Pull body up until chin clears bar",
      "Lower with control to starting position",
      "Keep core engaged throughout",
    ],
  },
  {
    id: "10",
    name: "Plank",
    category: "Core",
    type: "strength",
    description: "Static plank hold",
    muscleGroups: ["Core", "Shoulders"],
    equipment: ["None"],
    instructions: [
      "Start in push-up position",
      "Lower to forearms",
      "Keep body in straight line",
      "Hold position for desired time",
    ],
  },
]

export class ExerciseService {
  async searchExercises(query, type) {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    let results = mockExerciseDatabase

    if (type) {
      results = results.filter((exercise) => exercise.type === type)
    }

    if (!query.trim()) return results.slice(0, 10)

    return results.filter(
      (exercise) =>
        exercise.name.toLowerCase().includes(query.toLowerCase()) ||
        exercise.category.toLowerCase().includes(query.toLowerCase()) ||
        (exercise.muscleGroups &&
          exercise.muscleGroups.some((group) => group.toLowerCase().includes(query.toLowerCase()))),
    )
  }

  async addCustomExercise(exercise) {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newExercise = {
      ...exercise,
      id: Date.now().toString(),
      isCustom: true,
    }

    return newExercise
  }

  async addExerciseEntry(entry) {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    const newEntry = {
      ...entry,
      id: Date.now().toString(),
    }

    return newEntry
  }

  async getDailyExercise(date, userId) {
    // Simulate API call with mock data
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Mock exercise entries for today
    const mockExercises = {
      date,
      totalCaloriesBurned: 320,
      totalDuration: 65,
      exercises: [
        {
          id: "1",
          exerciseId: "1",
          exerciseName: "Running",
          type: "cardio",
          date,
          userId,
          duration: 30,
          caloriesBurned: 300,
          distance: 5,
          distanceUnit: "km",
        },
        {
          id: "2",
          exerciseId: "5",
          exerciseName: "Bench Press",
          type: "strength",
          date,
          userId,
          sets: [
            { reps: 10, weight: 60 },
            { reps: 8, weight: 65 },
            { reps: 6, weight: 70 },
          ],
          totalWeight: 195,
          totalReps: 24,
        },
        {
          id: "3",
          exerciseId: "6",
          exerciseName: "Squats",
          type: "strength",
          date,
          userId,
          sets: [
            { reps: 12, weight: 80 },
            { reps: 10, weight: 85 },
            { reps: 8, weight: 90 },
          ],
          totalWeight: 255,
          totalReps: 30,
        },
      ],
    }

    return mockExercises
  }

  calculateCaloriesBurned(exercise, duration, userWeight = 70) {
    if (exercise.caloriesPerMinute) {
     
      const weightMultiplier = userWeight / 70
      return Math.round(exercise.caloriesPerMinute * duration * weightMultiplier)
    }

    
    return Math.round(5 * duration)
  }
}

export const exerciseService = new ExerciseService()
