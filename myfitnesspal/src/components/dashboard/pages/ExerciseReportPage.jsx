"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { generateExerciseData, calculateExerciseStats } from "../../lib/reports";

export const ExerciseReportPage = () => {
  const [timeRange, setTimeRange] = useState("30")
  const [exerciseData, setExerciseData] = useState([])
  const [stats, setStats] = useState({})

  useEffect(() => {
    const data = generateExerciseData(Number.parseInt(timeRange))
    setExerciseData(data)
    setStats(calculateExerciseStats(data))
  }, [timeRange])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link to="/reports" className="text-primary hover:underline text-sm">
            ← Back to Reports
          </Link>
          <h1 className="text-2xl font-bold text-foreground mt-2">Exercise Reports</h1>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Total Calories Burned</h3>
          <p className="text-2xl font-bold text-foreground mt-2">{stats.totalCaloriesBurned?.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-1">in {timeRange} days</p>
        </div>
        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Total Duration</h3>
          <p className="text-2xl font-bold text-foreground mt-2">{Math.round((stats.totalDuration || 0) / 60)}h</p>
          <p className="text-xs text-muted-foreground mt-1">{stats.totalDuration} minutes</p>
        </div>
        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Active Days</h3>
          <p className="text-2xl font-bold text-foreground mt-2">{stats.activeDays}</p>
          <p className="text-xs text-muted-foreground mt-1">out of {timeRange} days</p>
        </div>
        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Avg Calories/Day</h3>
          <p className="text-2xl font-bold text-foreground mt-2">{stats.avgCaloriesPerDay}</p>
          <p className="text-xs text-muted-foreground mt-1">per active day</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Activity</h3>
          <div className="space-y-3">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => {
              const intensity = Math.random() * 100
              return (
                <div key={day} className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-foreground w-8">{day}</span>
                  <div className="flex-1 bg-muted rounded-full h-3">
                    <div className="bg-primary h-3 rounded-full" style={{ width: `${intensity}%` }}></div>
                  </div>
                  <span className="text-sm text-muted-foreground w-12 text-right">{Math.round(intensity)}%</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Exercise Types</h3>
          <div className="space-y-4">
            {[
              { name: "Cardio", percentage: 45, color: "bg-red-500" },
              { name: "Strength", percentage: 35, color: "bg-blue-500" },
              { name: "Flexibility", percentage: 15, color: "bg-green-500" },
              { name: "Sports", percentage: 5, color: "bg-purple-500" },
            ].map((type) => (
              <div key={type.name}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{type.name}</span>
                  <span className="text-sm text-muted-foreground">{type.percentage}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className={`h-2 rounded-full ${type.color}`} style={{ width: `${type.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Workouts</h3>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {exerciseData.slice(-10).map((day) => (
            <div
              key={day.date}
              className="flex items-center justify-between py-3 border-b border-border last:border-b-0"
            >
              <div>
                <span className="text-sm font-medium text-foreground">{new Date(day.date).toLocaleDateString()}</span>
                <p className="text-xs text-muted-foreground">
                  {day.exercises} exercises • {day.duration} minutes
                </p>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-foreground">{day.caloriesBurned} cal</span>
                <p className="text-xs text-muted-foreground">burned</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Exercise Insights</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-800">Consistency Streak</h4>
            <p className="text-sm text-blue-700 mt-1">
              You've been active for {stats.activeDays} out of {timeRange} days. Keep up the great work!
            </p>
          </div>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-medium text-green-800">Calorie Goal</h4>
            <p className="text-sm text-green-700 mt-1">
              You're burning an average of {stats.avgCaloriesPerDay} calories per workout session.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
