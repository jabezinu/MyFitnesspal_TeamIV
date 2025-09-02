

import { useState, useEffect } from "react"
import { generateSystemStats } from "../../lib/admin"; // Updated path

export const AdminOverviewPage = () => {
  const [stats, setStats] = useState({})

  useEffect(() => {
    setStats(generateSystemStats())
  }, [])

  const statCards = [
    { name: "Total Users", value: stats.totalUsers?.toLocaleString(), change: "+12%", changeType: "positive" },
    { name: "Active Users", value: stats.activeUsers?.toLocaleString(), change: "+8%", changeType: "positive" },
    { name: "Total Foods", value: stats.totalFoods?.toLocaleString(), change: "+5%", changeType: "positive" },
    { name: "Total Exercises", value: stats.totalExercises?.toLocaleString(), change: "+3%", changeType: "positive" },
  ]

  const activityCards = [
    { name: "Calories Logged", value: stats.totalCaloriesLogged?.toLocaleString(), unit: "total" },
    { name: "Workouts Logged", value: stats.totalWorkoutsLogged?.toLocaleString(), unit: "total" },
    { name: "Daily Active Users", value: stats.avgDailyActiveUsers?.toLocaleString(), unit: "average" },
    { name: "New Users This Month", value: stats.newUsersThisMonth?.toLocaleString(), unit: "this month" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Admin Overview</h1>
        <p className="text-muted-foreground mt-2">Monitor your fitness app's performance and user activity</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-card rounded-lg border p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-muted-foreground">{stat.name}</h3>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  stat.changeType === "positive" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {activityCards.map((card) => (
          <div key={card.name} className="bg-card rounded-lg border p-6">
            <h3 className="text-sm font-medium text-muted-foreground">{card.name}</h3>
            <p className="text-2xl font-bold text-foreground mt-2">{card.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{card.unit}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">System Health</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">User Retention Rate</span>
              <span className="text-sm font-medium text-foreground">{stats.retentionRate}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${stats.retentionRate}%` }}></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Avg Session Duration</span>
              <span className="text-sm font-medium text-foreground">{stats.avgSessionDuration} min</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${(stats.avgSessionDuration / 30) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">New user registered</p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Food item added to database</p>
                <p className="text-xs text-muted-foreground">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">System backup completed</p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <button className="p-4 text-left border border-border rounded-lg hover:bg-muted transition-colors">
            <h4 className="font-medium text-foreground">Manage Users</h4>
            <p className="text-sm text-muted-foreground mt-1">View and manage user accounts</p>
          </button>
          <button className="p-4 text-left border border-border rounded-lg hover:bg-muted transition-colors">
            <h4 className="font-medium text-foreground">Update Database</h4>
            <p className="text-sm text-muted-foreground mt-1">Add or modify food and exercise data</p>
          </button>
          <button className="p-4 text-left border border-border rounded-lg hover:bg-muted transition-colors">
            <h4 className="font-medium text-foreground">View Analytics</h4>
            <p className="text-sm text-muted-foreground mt-1">Analyze user behavior and app performance</p>
          </button>
        </div>
      </div>
    </div>
  )
}
