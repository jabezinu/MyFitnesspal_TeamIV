"use client"

import { useState, useEffect } from "react"
import { generateExerciseDatabase } from "../../lib/admin"; // Updated path

export const ExerciseManagementPage = () => {
  const [exercises, setExercises] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [showAddForm, setShowAddForm] = useState(false)
  const [newExercise, setNewExercise] = useState({
    name: "",
    category: "Cardio",
    caloriesPerMinute: "",
    muscleGroups: "Full Body",
    equipment: "None",
    difficulty: "Beginner",
  })

  useEffect(() => {
    setExercises(generateExerciseDatabase())
  }, [])

  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || exercise.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const handleAddExercise = (e) => {
    e.preventDefault()
    const exercise = {
      id: `exercise_${Date.now()}`,
      ...newExercise,
      caloriesPerMinute: Number.parseInt(newExercise.caloriesPerMinute),
      addedBy: "admin",
      dateAdded: new Date().toISOString().split("T")[0],
      verified: true,
    }
    setExercises([exercise, ...exercises])
    setNewExercise({
      name: "",
      category: "Cardio",
      caloriesPerMinute: "",
      muscleGroups: "Full Body",
      equipment: "None",
      difficulty: "Beginner",
    })
    setShowAddForm(false)
  }

  const handleDeleteExercise = (exerciseId) => {
    if (window.confirm("Are you sure you want to delete this exercise?")) {
      setExercises(exercises.filter((exercise) => exercise.id !== exerciseId))
    }
  }

  const handleVerifyExercise = (exerciseId) => {
    setExercises(
      exercises.map((exercise) =>
        exercise.id === exerciseId ? { ...exercise, verified: !exercise.verified } : exercise,
      ),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Exercise Database Management</h1>
          <p className="text-muted-foreground mt-2">Manage exercise database and workout information</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Add New Exercise
        </button>
      </div>

      {showAddForm && (
        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Add New Exercise</h3>
          <form onSubmit={handleAddExercise} className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Exercise Name</label>
              <input
                type="text"
                required
                value={newExercise.name}
                onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Category</label>
              <select
                value={newExercise.category}
                onChange={(e) => setNewExercise({ ...newExercise, category: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="Cardio">Cardio</option>
                <option value="Strength">Strength</option>
                <option value="Flexibility">Flexibility</option>
                <option value="Sports">Sports</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Calories per Minute</label>
              <input
                type="number"
                required
                value={newExercise.caloriesPerMinute}
                onChange={(e) => setNewExercise({ ...newExercise, caloriesPerMinute: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Muscle Groups</label>
              <select
                value={newExercise.muscleGroups}
                onChange={(e) => setNewExercise({ ...newExercise, muscleGroups: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="Chest">Chest</option>
                <option value="Back">Back</option>
                <option value="Legs">Legs</option>
                <option value="Arms">Arms</option>
                <option value="Core">Core</option>
                <option value="Full Body">Full Body</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Equipment</label>
              <select
                value={newExercise.equipment}
                onChange={(e) => setNewExercise({ ...newExercise, equipment: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="None">None</option>
                <option value="Dumbbells">Dumbbells</option>
                <option value="Barbell">Barbell</option>
                <option value="Machine">Machine</option>
                <option value="Cardio Equipment">Cardio Equipment</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Difficulty</label>
              <select
                value={newExercise.difficulty}
                onChange={(e) => setNewExercise({ ...newExercise, difficulty: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div className="md:col-span-2 flex space-x-3">
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Add Exercise
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
            placeholder="Search exercises..."
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
          <option value="Cardio">Cardio</option>
          <option value="Strength">Strength</option>
          <option value="Flexibility">Flexibility</option>
          <option value="Sports">Sports</option>
        </select>
      </div>

      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Exercise
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Details
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
              {filteredExercises.slice(0, 20).map((exercise) => (
                <tr key={exercise.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-foreground">{exercise.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Added {new Date(exercise.dateAdded).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                      {exercise.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-foreground">
                      <div>{exercise.caloriesPerMinute} cal/min</div>
                      <div className="text-muted-foreground">
                        {exercise.muscleGroups} • {exercise.difficulty}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        exercise.verified ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {exercise.verified ? "Verified" : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleVerifyExercise(exercise.id)}
                        className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                      >
                        {exercise.verified ? "Unverify" : "Verify"}
                      </button>
                      <button
                        onClick={() => handleDeleteExercise(exercise.id)}
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
