import React, { useState } from "react";
import { Target, Flame, Droplets, Scale, Save } from "lucide-react";

const GoalsPage = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [goals, setGoals] = useState({
    dailyCalories: "2000",
    protein: "150",
    carbs: "250",
    fat: "67",
    water: "8",
    weeklyWeightLoss: "0.5",
    exerciseDays: "4",
    exerciseMinutes: "45",
  });

  const handleSave = async () => {
    setIsSaving(true);
    setMessage("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      setMessage("Goals updated successfully!");
    } catch (error) {
      setMessage("Failed to update goals. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setGoals((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Goals</h1>
        <p className="text-muted-foreground">Set and adjust your fitness and nutrition targets</p>
      </div>

      {message && (
        <div className="alert">
          <p>{message}</p>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Nutrition Goals */}
        <div className="bg-gray-100 rounded-lg p-4">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <Flame className="h-5 w-5 text-primary" />
            Nutrition Goals
          </h2>
          <p>Set your daily nutrition targets</p>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <label htmlFor="dailyCalories" className="block">Daily Calories</label>
              <input
                id="dailyCalories"
                type="number"
                value={goals.dailyCalories}
                onChange={(e) => handleInputChange("dailyCalories", e.target.value)}
                className="border rounded p-2 w-full"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <label htmlFor="protein" className="block">Protein (g)</label>
                <input
                  id="protein"
                  type="number"
                  value={goals.protein}
                  onChange={(e) => handleInputChange("protein", e.target.value)}
                  className="border rounded p-2 w-full"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="carbs" className="block">Carbs (g)</label>
                <input
                  id="carbs"
                  type="number"
                  value={goals.carbs}
                  onChange={(e) => handleInputChange("carbs", e.target.value)}
                  className="border rounded p-2 w-full"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="fat" className="block">Fat (g)</label>
                <input
                  id="fat"
                  type="number"
                  value={goals.fat}
                  onChange={(e) => handleInputChange("fat", e.target.value)}
                  className="border rounded p-2 w-full"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="water" className="flex items-center gap-2 block">
                <Droplets className="h-4 w-4 text-blue-500" />
                Daily Water (glasses)
              </label>
              <input
                id="water"
                type="number"
                value={goals.water}
                onChange={(e) => handleInputChange("water", e.target.value)}
                className="border rounded p-2 w-full"
              />
            </div>
          </div>
        </div>

        {/* Fitness Goals */}
        <div className="bg-gray-100 rounded-lg p-4">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <Target className="h-5 w-5 text-secondary" />
            Fitness Goals
          </h2>
          <p>Set your exercise and weight targets</p>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <label htmlFor="weeklyWeightLoss" className="flex items-center gap-2 block">
                <Scale className="h-4 w-4 text-green-500" />
                Weekly Weight Loss (kg)
              </label>
              <select
                value={goals.weeklyWeightLoss}
                onChange={(e) => handleInputChange("weeklyWeightLoss", e.target.value)}
                className="border rounded p-2 w-full"
              >
                <option value="0.25">0.25 kg (Conservative)</option>
                <option value="0.5">0.5 kg (Moderate)</option>
                <option value="0.75">0.75 kg (Aggressive)</option>
                <option value="1">1 kg (Very Aggressive)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="exerciseDays" className="block">Exercise Days per Week</label>
              <select
                value={goals.exerciseDays}
                onChange={(e) => handleInputChange("exerciseDays", e.target.value)}
                className="border rounded p-2 w-full"
              >
                <option value="2">2 days</option>
                <option value="3">3 days</option>
                <option value="4">4 days</option>
                <option value="5">5 days</option>
                <option value="6">6 days</option>
                <option value="7">7 days</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="exerciseMinutes" className="block">Minutes per Session</label>
              <select
                value={goals.exerciseMinutes}
                onChange={(e) => handleInputChange("exerciseMinutes", e.target.value)}
                className="border rounded p-2 w-full"
              >
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">60 minutes</option>
                <option value="90">90 minutes</option>
                <option value="120">120 minutes</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Goal Summary */}
      <div className="bg-gray-100 rounded-lg p-4">
        <h2 className="text-xl font-semibold">Goal Summary</h2>
        <p className="text-muted-foreground">Overview of your current targets</p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary">{goals.dailyCalories}</div>
            <div className="text-sm text-muted-foreground">Daily Calories</div>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-secondary">{goals.exerciseDays}</div>
            <div className="text-sm text-muted-foreground">Exercise Days/Week</div>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{goals.water}</div>
            <div className="text-sm text-muted-foreground">Water Glasses/Day</div>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-green-600">{goals.weeklyWeightLoss}</div>
            <div className="text-sm text-muted-foreground">kg Weight Loss/Week</div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} disabled={isSaving} className="bg-blue-500 text-white rounded px-4 py-2">
          {isSaving ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Goals
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default GoalsPage;