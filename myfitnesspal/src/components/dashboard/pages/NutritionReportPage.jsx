import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { generateNutritionData, calculateNutritionStats } from "../../lib/reports";

export const NutritionReportPage = () => {
  const [timeRange, setTimeRange] = useState("30");
  const [nutritionData, setNutritionData] = useState([]);
  const [stats, setStats] = useState({});
  const [userGoals, setUserGoals] = useState({
    protein: 120,
    carbs: 200,
    fat: 70,
  });

  useEffect(() => {
    const data = generateNutritionData(Number.parseInt(timeRange));
    setNutritionData(data);
    setStats(calculateNutritionStats(data));
  }, [timeRange]);

  const macroData = [
    { name: "Protein", value: stats.avgProtein, color: "bg-blue-500", target: userGoals.protein },
    { name: "Carbohydrates", value: stats.avgCarbs, color: "bg-green-500", target: userGoals.carbs },
    { name: "Fat", value: stats.avgFat, color: "bg-yellow-500", target: userGoals.fat },
  ];

  const handleGoalChange = (e) => {
    const { name, value } = e.target;
    setUserGoals((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <Link to="/reports" className="text-primary hover:underline text-sm">
            ← Back to Reports
          </Link>
          <h1 className="text-2xl font-bold text-foreground mt-2">Nutrition Reports</h1>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
        >
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="90">Last 90 Days</option>
        </select>
      </header>

      <div className="grid gap-6 md:grid-cols-4">
        {[
          { label: "Average Calories", value: stats.avgCalories, unit: "per day" },
          { label: "Average Protein", value: `${stats.avgProtein}g`, unit: "per day" },
          { label: "Average Carbohydrates", value: `${stats.avgCarbs}g`, unit: "per day" },
          { label: "Average Fat", value: `${stats.avgFat}g`, unit: "per day" },
        ].map((item) => (
          <div key={item.label} className="bg-card rounded-lg border p-6">
            <h3 className="text-sm font-medium text-muted-foreground">{item.label}</h3>
            <p className="text-2xl font-bold text-foreground mt-2">{item.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{item.unit}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Macronutrient Breakdown</h3>
          <div className="space-y-4">
            {macroData.map((macro) => (
              <div key={macro.name}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{macro.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {macro.value}g / {macro.target}g
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${macro.color}`}
                    style={{ width: `${Math.min((macro.value / macro.target) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {Math.round((macro.value / macro.target) * 100)}% of target
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Set Your Goals</h3>
          <div className="space-y-4">
            {["protein", "carbs", "fat"].map((macro) => (
              <div key={macro} className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground capitalize">{macro}</label>
                <input
                  type="number"
                  name={macro}
                  value={userGoals[macro]}
                  onChange={handleGoalChange}
                  className="px-3 py-1 border border-border rounded-md bg-background text-foreground w-20"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Daily Calorie Trend</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {nutritionData.slice(-10).map((day) => (
            <div key={day.date} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
              <span className="text-sm text-muted-foreground">{new Date(day.date).toLocaleDateString()}</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${Math.min((day.calories / 2500) * 100, 100)}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-foreground w-16 text-right">{day.calories}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Nutrition Insights</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-medium text-green-800">Excellent Progress!</h4>
            <p className="text-sm text-green-700 mt-1">
              You have consistently met your protein intake goal, averaging {stats.avgProtein}g per day.
            </p>
          </div>
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-medium text-yellow-800">Opportunities for Improvement</h4>
            <p className="text-sm text-yellow-700 mt-1">
              Consider enhancing your fiber intake by incorporating more vegetables and whole grains into your meals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};