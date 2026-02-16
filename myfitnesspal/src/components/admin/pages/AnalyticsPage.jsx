
import { useState, useEffect } from "react";
import { generateSystemStats } from "../../lib/admin"; // Updated path


export const AnalyticsPage = () => {
  const [stats, setStats] = useState({});
  const [timeRange, setTimeRange] = useState("30");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      try {
        const data = generateSystemStats();
        setStats(data);
      } catch (err) {
        setError("Failed to load statistics.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeRange]);

  const chartData = [
    { name: "Jan", users: 120, calories: 45000, workouts: 890 },
    { name: "Feb", users: 145, calories: 52000, workouts: 1020 },
    { name: "Mar", users: 180, calories: 68000, workouts: 1340 },
    { name: "Apr", users: 220, calories: 78000, workouts: 1580 },
    { name: "May", users: 280, calories: 95000, workouts: 1890 },
    { name: "Jun", users: 340, calories: 112000, workouts: 2150 },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-2">Detailed insights into app performance and user behavior</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
          <option value="365">Last year</option>
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-sm font-medium text-muted-foreground">User Growth</h3>
          <p className="text-2xl font-bold text-foreground mt-2">+{stats.newUsersThisMonth}</p>
          <p className="text-xs text-green-600 mt-1">+12% from last month</p>
        </div>
        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Retention Rate</h3>
          <p className="text-2xl font-bold text-foreground mt-2">{stats.retentionRate}%</p>
          <p className="text-xs text-green-600 mt-1">+3% from last month</p>
        </div>
        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Avg Session</h3>
          <p className="text-2xl font-bold text-foreground mt-2">{stats.avgSessionDuration}m</p>
          <p className="text-xs text-blue-600 mt-1">+1.2m from last month</p>
        </div>
        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Daily Active</h3>
          <p className="text-2xl font-bold text-foreground mt-2">{stats.avgDailyActiveUsers}</p>
          <p className="text-xs text-green-600 mt-1">+8% from last month</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">User Growth Trend</h3>
          <div className="space-y-3">
            {chartData.map((month) => (
              <div key={month.name} className="flex items-center space-x-3">
                <span className="text-sm font-medium text-foreground w-8">{month.name}</span>
                <div className="flex-1 bg-muted rounded-full h-3">
                  <div className="bg-primary h-3 rounded-full" style={{ width: `${(month.users / 340) * 100}%` }}></div>
                </div>
                <span className="text-sm text-muted-foreground w-12 text-right">{month.users}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Activity Metrics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Calories Logged</span>
                <span className="text-sm font-medium text-foreground">
                  {stats.totalCaloriesLogged?.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Workouts Logged</span>
                <span className="text-sm font-medium text-foreground">
                  {stats.totalWorkoutsLogged?.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "72%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Food Items Added</span>
                <span className="text-sm font-medium text-foreground">{stats.totalFoods?.toLocaleString()}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: "68%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Feature Usage</h3>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">78%</div>
            <div className="text-sm text-muted-foreground">Food Tracking</div>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: "78%" }}></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">65%</div>
            <div className="text-sm text-muted-foreground">Exercise Logging</div>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: "65%" }}></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">42%</div>
            <div className="text-sm text-muted-foreground">Progress Reports</div>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: "42%" }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Top Performing Content</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="text-sm font-medium text-foreground">Chicken Breast</span>
              <span className="text-sm text-muted-foreground">2,340 logs</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="text-sm font-medium text-foreground">Running</span>
              <span className="text-sm text-muted-foreground">1,890 sessions</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="text-sm font-medium text-foreground">Brown Rice</span>
              <span className="text-sm text-muted-foreground">1,650 logs</span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">User Engagement</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Daily Active Users</span>
              <span className="text-sm font-medium text-foreground">{stats.avgDailyActiveUsers}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Weekly Active Users</span>
              <span className="text-sm font-medium text-foreground">{Math.round(stats.avgDailyActiveUsers * 4.2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Monthly Active Users</span>
              <span className="text-sm font-medium text-foreground">{stats.activeUsers}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Avg Session Duration</span>
              <span className="text-sm font-medium text-foreground">{stats.avgSessionDuration} minutes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};