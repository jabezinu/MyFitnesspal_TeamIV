import { Link } from "react-router-dom";

export const ReportsPage = () => {
  const reportCards = [
    {
      title: "Nutrition Reports",
      description: "Track your daily nutrition intake, macronutrients, and dietary goals.",
      icon: "/nutrition-food-chart-icon.png",
      link: "/reports/nutrition",
      color: "bg-green-50 border-green-200",
      iconBg: "bg-green-100",
    },
    {
      title: "Exercise Reports",
      description: "Monitor your workout progress, calories burned, and activity trends.",
      icon: "/exercise.png",
      link: "/reports/exercise",
      color: "bg-blue-50 border-blue-200",
      iconBg: "bg-blue-100",
    },
    {
      title: "Weight Progress",
      description: "Visualize your weight loss journey and body composition changes.",
      icon: "/weight-progress-chart-icon.png",
      link: "/reports/weight",
      color: "bg-purple-50 border-purple-200",
      iconBg: "bg-purple-100",
    },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-foreground">Progress Reports</h1>
        <p className="text-muted-foreground mt-2">
          Track your fitness journey with detailed analytics and insights.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reportCards.map((card) => (
          <Link
            key={card.title}
            to={card.link}
            className={`block p-6 rounded-lg border-2 transition-all hover:shadow-lg hover:scale-105 ${card.color}`}
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full ${card.iconBg}`}>
                <img src={card.icon || "/placeholder.svg"} alt={card.title} className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">{card.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{card.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-card rounded-lg border p-6 shadow-md">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Stats</h3>
          <div className="space-y-3">
            {["Days Tracked", "Average Calories", "Workouts Completed", "Weight Change"].map((stat, index) => (
              <div className="flex justify-between" key={index}>
                <span className="text-muted-foreground">{stat}</span>
                <span className="font-medium">{index === 0 ? "28 days" : index === 1 ? "2,150 kcal" : index === 2 ? "18 sessions" : "-3.2 lbs"}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-lg border p-6 shadow-md">
          <h3 className="text-lg font-semibold text-foreground mb-4">Goals Progress</h3>
          <div className="space-y-4">
            {[
              { label: "Daily Calorie Goal", progress: 85 },
              { label: "Weekly Exercise Goal", progress: 92 },
              { label: "Weight Loss Goal", progress: 64 },
            ].map((goal) => (
              <div key={goal.label}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{goal.label}</span>
                  <span className="text-sm font-medium">{goal.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: `${goal.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};