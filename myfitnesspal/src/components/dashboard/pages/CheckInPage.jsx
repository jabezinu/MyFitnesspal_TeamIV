
import React, { useState } from "react";
import { Scale, TrendingDown, TrendingUp, Calendar, Save } from "lucide-react";

export const CheckInPage = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [checkIn, setCheckIn] = useState({
    weight: "",
    bodyFat: "",
    muscleMass: "",
    notes: "",
  });

  // Mock recent weight entries
  const recentEntries = [
    { date: "2024-01-15", weight: 50.2, change: -0.3 },
    { date: "2024-01-12", weight: 50.5, change: -0.2 },
    { date: "2024-01-09", weight: 50.7, change: -0.4 },
    { date: "2024-01-06", weight: 51.1, change: -0.1 },
    { date: "2024-01-03", weight: 51.2, change: 0.0 },
  ];

  const handleSave = async () => {
    if (!checkIn.weight) {
      setMessage("Please enter your weight");
      return;
    }

    setIsSaving(true);
    setMessage("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      setMessage("Check-in recorded successfully!");
      setCheckIn({ weight: "", bodyFat: "", muscleMass: "", notes: "" });
    } catch (error) {
      setMessage("Failed to record check-in. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setCheckIn((prev) => ({ ...prev, [field]: value }));
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Daily Check-In</h1>
        <p className="text-muted-foreground flex items-center gap-2 mt-1">
          <Calendar className="h-4 w-4" />
          {today}
        </p>
      </div>

      {message && (
        <div className="alert">
          <p>{message}</p>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Check-in Form */}
        <div className="bg-gray-100 rounded-lg p-4">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <Scale className="h-5 w-5 text-primary" />
            Record Today's Metrics
          </h2>
          <p>Track your progress with daily measurements</p>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <label htmlFor="weight" className="block">Weight (kg) *</label>
              <input
                id="weight"
                type="number"
                step="0.1"
                placeholder="Enter your weight"
                value={checkIn.weight}
                onChange={(e) => handleInputChange("weight", e.target.value)}
                className="border rounded p-2 w-full"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="bodyFat" className="block">Body Fat (%)</label>
                <input
                  id="bodyFat"
                  type="number"
                  step="0.1"
                  placeholder="Optional"
                  value={checkIn.bodyFat}
                  onChange={(e) => handleInputChange("bodyFat", e.target.value)}
                  className="border rounded p-2 w-full"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="muscleMass" className="block">Muscle Mass (kg)</label>
                <input
                  id="muscleMass"
                  type="number"
                  step="0.1"
                  placeholder="Optional"
                  value={checkIn.muscleMass}
                  onChange={(e) => handleInputChange("muscleMass", e.target.value)}
                  className="border rounded p-2 w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="notes" className="block">Notes</label>
              <textarea
                id="notes"
                placeholder="How are you feeling? Any observations?"
                value={checkIn.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                rows={3}
                className="border rounded p-2 w-full"
              />
            </div>

            <button onClick={handleSave} disabled={isSaving} className="bg-blue-500 text-white rounded px-4 py-2 w-full">
              {isSaving ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                  Recording...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Record Check-In
                </>
              )}
            </button>
          </div>
        </div>

        {/* Recent Entries */}
        <div className="bg-gray-100 rounded-lg p-4">
          <h2 className="text-xl font-semibold">Recent Check-Ins</h2>
          <p>Your weight tracking history</p>
          <div className="space-y-3 mt-4">
            {recentEntries.map((entry) => (
              <div key={entry.date} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <div className="font-medium">{entry.weight} kg</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(entry.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
                <div
                  className={`flex items-center gap-1 ${
                    entry.change < 0 ? "text-green-600" : entry.change > 0 ? "text-red-600" : "text-muted-foreground"
                  }`}
                >
                  {entry.change < 0 ? (
                    <TrendingDown className="h-4 w-4" />
                  ) : entry.change > 0 ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : null}
                  <span className="text-sm font-medium">
                    {entry.change > 0 ? "+" : ""}
                    {entry.change.toFixed(1)} kg
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Summary */}
      <div className="bg-gray-100 rounded-lg p-4">
        <h2 className="text-xl font-semibold">Progress Summary</h2>
        <p>Your weight loss journey at a glance</p>
        <div className="grid gap-4 md:grid-cols-3 mt-4">
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary">50.2 kg</div>
            <div className="text-sm text-muted-foreground">Current Weight</div>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-green-600">-1.0 kg</div>
            <div className="text-sm text-muted-foreground">Total Lost</div>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-secondary">5.2 kg</div>
            <div className="text-sm text-muted-foreground">To Goal</div>
          </div>
        </div>
      </div>
    </div>
  );
};