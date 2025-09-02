import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

// StatsCard Component
const StatsCard = ({ title, value, goal, progress, color }) => (
  <div className="bg-card rounded-lg border p-6 relative overflow-hidden">
    <div className={`absolute top-0 right-0 w-16 h-16 bg-${color}/10 rounded-full -mr-8 -mt-8`}></div>
    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
      <h3 className="text-sm font-medium">{title}</h3>
      <svg className={`h-4 w-4 text-${color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {/* SVG path here */}
      </svg>
    </div>
    <div>
      <div className="text-2xl font-bold text-primary">{value}</div>
      <p className="text-xs text-muted-foreground">Goal: {goal}</p>
      <div className="w-full bg-muted rounded-full h-2 mt-2">
        <div className={`bg-${color} h-2 rounded-full transition-all`} style={{ width: `${Math.min(progress, 100)}%` }}></div>
      </div>
    </div>
  </div>
);

// ActionCard Component
const ActionCard = ({ title, description, to, imgSrc, color }) => (
  <div className="bg-card rounded-lg border hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
    <Link to={to} className="block">
      <div className={`h-32 bg-gradient-to-br from-${color}/5 to-${color}/15 relative`}>
        <img src={imgSrc} alt={`${title} tracking`} className="w-full h-full object-cover opacity-80" />
        <div className={`absolute inset-0 bg-${color}/10`}></div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-2">
          <svg className={`h-5 w-5 text-${color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {/* SVG path here */}
          </svg>
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
        <div className={`inline-flex items-center px-3 py-1 bg-${color}/10 text-${color} rounded-full text-sm`}>
          Edit {title}
        </div>
      </div>
    </Link>
  </div>
);

export const HomePage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    caloriesConsumed: 150,
    caloriesGoal: 200,
    caloriesBurned: 120,
    currentWeight: 53,
    weightGoal: 50,
    waterIntake: 3,
    waterGoal: 5,
  });

  const caloriesRemaining = stats.caloriesGoal - stats.caloriesConsumed + stats.caloriesBurned;
  const caloriesProgress = (stats.caloriesConsumed / stats.caloriesGoal) * 100;
  const waterProgress = (stats.waterIntake / stats.waterGoal) * 100;

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-6">
      <div className="relative bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/fitness-motivation-abstract-pattern.png')] bg-cover bg-center opacity-10"></div>
        <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
<div className="w-full flex flex-col items-center text-center py-10">
  <h1 className="text-3xl md:text-4xl font-bold text-foreground">
    Welcome back, {user?.name?.split(" ")[0]}! 🌟
  </h1>

  <p className="text-muted-foreground flex items-center gap-2 mt-2">
    <svg
      className="h-5 w-5 text-secondary"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
    {today}
  </p>
</div>


          <div className="flex gap-2">
  <Link
    to="/checkin" // Ensure this is correct
    className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
  >
    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      {/* SVG path here */}
    </svg>
    Quick Check-in
  </Link>
</div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Calories Remaining" value={Math.max(caloriesRemaining, 0)} goal={stats.caloriesGoal} progress={caloriesProgress} color="primary" />
        <StatsCard title="Weight Progress" value={`${stats.currentWeight} kg`} goal={`${stats.weightGoal} kg`} progress={((stats.currentWeight - stats.weightGoal) / stats.currentWeight) * 100} color="secondary" />
        <StatsCard title="Calories Burned" value={stats.caloriesBurned} goal="Today's exercise" progress={100} color="orange-500" />
        <StatsCard title="Water Intake" value={`${stats.waterIntake}/${stats.waterGoal}`} goal="Glasses today" progress={waterProgress} color="blue-500" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 m-5 h-75">
        <ActionCard title="Log Food" description="Add meals and track your nutrition" to="/food" imgSrc="/healthy-food-fruits-vegetables-nutrition.png" color="green" />
        <ActionCard title="Log Exercise" description="Record your workouts and activities" to="/exercises" imgSrc="/fitness-exercise-workout-gym-equipment.png" color="primary" /> 
        <ActionCard title="Edit profile" description="You Can edit your profile by clicking here" to="/profile" imgSrc="/download.jpg" color="primary" />
        <ActionCard title="Edit Goal" description="You Can edit your goal by clicking here" to="/goals" imgSrc="/fitness-goals-target-achievement-success.png" color="primary" />
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/fitness-motivation-success-achievement.png')] bg-cover bg-center opacity-5"></div>
        <div className="relative text-center">
          <blockquote className="text-xl font-medium text-foreground mb-2">
            "The groundwork for all happiness is good health."
          </blockquote>
          <p className="text-sm text-muted-foreground">Stay motivated on your journey to wellness!</p>
        </div>
      </div>
    </div>
  );
};