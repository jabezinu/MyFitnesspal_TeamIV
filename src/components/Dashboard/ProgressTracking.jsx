import React from "react";
import calloglogo from "../../assets/img/calloglogo.png";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";

const ProgressTracking = () => {
  const weightData = [
    { date: "2025-09-01", weight: 176 },
    { date: "2025-09-02", weight: 175.5 },
    { date: "2025-09-03", weight: 175 },
    { date: "2025-09-04", weight: 174.8 },
    { date: "2025-09-05", weight: 174.5 },
  ];

  const caloriesData = [
    { date: "2025-09-01", consumed: 2200, burned: 1800 },
    { date: "2025-09-02", consumed: 2100, burned: 2000 },
    { date: "2025-09-03", consumed: 2300, burned: 1900 },
    { date: "2025-09-04", consumed: 2000, burned: 1800 },
    { date: "2025-09-05", consumed: 2150, burned: 1850 },
  ];

  return (
    <div className="p-6 space-y-8">
      <nav className="relative flex justify-between items-center bg-[#1D2D44] px-6 py-3 shadow-lg">
        <div className="flex items-center gap-3">
          <img src={calloglogo} alt="Logo" className="h-10 w-auto" />
        </div>
      </nav>

      <h2 className="text-2xl font-bold">Progress Reports</h2>

      <div>
        <h3 className="text-xl font-semibold mb-2">Weight Over Time</h3>
        <LineChart width={600} height={300} data={weightData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="weight" stroke="#8884d8" />
        </LineChart>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">
          Calories Consumed vs Burned
        </h3>
        <BarChart width={600} height={300} data={caloriesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="consumed" fill="#FF6B6B" />
          <Bar dataKey="burned" fill="#4CAF50" />
        </BarChart>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Weekly Summary</h3>
        <p>Total Calories Consumed: 10,700 kcal</p>
        <p>Total Calories Burned: 9,350 kcal</p>
        <p>Average Weight: 175.16 lbs</p>
      </div>
    </div>
  );
};

export default ProgressTracking;
