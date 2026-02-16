
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { generateWeightData } from "../../lib/reports"

export const WeightProgressPage = () => {
  const [timeRange, setTimeRange] = useState("90")
  const [weightData, setWeightData] = useState([])

  useEffect(() => {
    const data = generateWeightData(Number.parseInt(timeRange))
    setWeightData(data)
  }, [timeRange])

  const currentWeight = weightData[weightData.length - 1]?.weight || 0
  const startWeight = weightData[0]?.weight || 0
  const weightChange = currentWeight - startWeight
  const weightChangePercentage = startWeight ? ((weightChange / startWeight) * 100).toFixed(1) : 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link to="/reports" className="text-primary hover:underline text-sm">
            ← Back to Reports
          </Link>
          <h1 className="text-2xl font-bold text-foreground mt-2">Weight Progress</h1>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
        >
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
          <option value="180">Last 6 months</option>
          <option value="365">Last year</option>
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Current Weight</h3>
          <p className="text-2xl font-bold text-foreground mt-2">{currentWeight} lbs</p>
          <p className="text-xs text-muted-foreground mt-1">latest entry</p>
        </div>
        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Weight Change</h3>
          <p className={`text-2xl font-bold mt-2 ${weightChange >= 0 ? "text-red-600" : "text-green-600"}`}>
            {weightChange >= 0 ? "+" : ""}
            {weightChange.toFixed(1)} lbs
          </p>
          <p className="text-xs text-muted-foreground mt-1">in {timeRange} days</p>
        </div>
        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Body Fat</h3>
          <p className="text-2xl font-bold text-foreground mt-2">
            {currentWeight ? (weightData[weightData.length - 1]?.bodyFat || 0).toFixed(1) : 0}%
          </p>
          <p className="text-xs text-muted-foreground mt-1">estimated</p>
        </div>
        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Muscle Mass</h3>
          <p className="text-2xl font-bold text-foreground mt-2">
            {currentWeight ? (weightData[weightData.length - 1]?.muscleMass || 0).toFixed(1) : 0}%
          </p>
          <p className="text-xs text-muted-foreground mt-1">estimated</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Weight Trend</h3>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {weightData.slice(-20).map((entry, index) => (
              <div
                key={entry.date}
                className="flex items-center justify-between py-2 border-b border-border last:border-b-0"
              >
                <span className="text-sm text-muted-foreground">{new Date(entry.date).toLocaleDateString()}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{
                        width: `${Math.max(10, Math.min(((entry.weight - 150) / 50) * 100, 100))}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-foreground w-16 text-right">{entry.weight} lbs</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Body Composition</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Body Fat</span>
                <span className="text-sm text-muted-foreground">
                  {currentWeight ? (weightData[weightData.length - 1]?.bodyFat || 0).toFixed(1) : 0}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className="bg-red-500 h-3 rounded-full"
                  style={{
                    width: `${currentWeight ? (weightData[weightData.length - 1]?.bodyFat || 0) * 2 : 0}%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Muscle Mass</span>
                <span className="text-sm text-muted-foreground">
                  {currentWeight ? (weightData[weightData.length - 1]?.muscleMass || 0).toFixed(1) : 0}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className="bg-blue-500 h-3 rounded-full"
                  style={{
                    width: `${currentWeight ? (weightData[weightData.length - 1]?.muscleMass || 0) * 2 : 0}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h4 className="font-medium text-foreground mb-2">Progress Summary</h4>
            <p className="text-sm text-muted-foreground">
              Over the last {timeRange} days, you've {weightChange >= 0 ? "gained" : "lost"}{" "}
              {Math.abs(weightChange).toFixed(1)} lbs ({Math.abs(weightChangePercentage)}%).
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Weight Insights</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div
            className={`p-4 border rounded-lg ${
              weightChange < 0 ? "bg-green-50 border-green-200" : "bg-blue-50 border-blue-200"
            }`}
          >
            <h4 className={`font-medium ${weightChange < 0 ? "text-green-800" : "text-blue-800"}`}>
              {weightChange < 0 ? "Weight Loss Progress" : "Weight Tracking"}
            </h4>
            <p className={`text-sm mt-1 ${weightChange < 0 ? "text-green-700" : "text-blue-700"}`}>
              {weightChange < 0
                ? `Great job! You've lost ${Math.abs(weightChange).toFixed(1)} lbs. Keep up the healthy habits.`
                : `Your weight has been relatively stable. Continue monitoring your progress.`}
            </p>
          </div>
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h4 className="font-medium text-purple-800">Body Composition</h4>
            <p className="text-sm text-purple-700 mt-1">
              Focus on maintaining muscle mass while working towards your weight goals through strength training.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
