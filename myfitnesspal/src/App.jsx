import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext'; 
import { HomePage } from "./components/dashboard/pages/HomePage";
import { ExerciseManagementPage } from "./components/admin/pages/ExerciseManagementPage";
import { FoodManagementPage } from "./components/admin/pages/FoodManagementPage";
import ProfilePage from "./components/dashboard/pages/ProfilePage";
import { Footer } from "./components/dashboard/pages/Footer";
import GoalsPage from "./components/dashboard/pages/GoalsPage";
import { CheckInPage } from "./components/dashboard/pages/CheckInPage";
import { NutritionReportPage } from "./components/dashboard/pages/NutritionReportPage";
import { FoodDiaryPage } from "./components/dashboard/pages/FoodDiaryPage";
import { WeightProgressPage } from "./components/dashboard/pages/WeightProgressPage";
import { ReportsPage } from "./components/dashboard/pages/ReportsPage";
import { ExerciseReportPage } from "./components/dashboard/pages/ExerciseReportPage";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { AdminProtectedRoute } from "./components/layout/AdminProtectedRoute";
import { UserManagementPage } from "./components/admin/pages/UserManagementPage";
import { AnalyticsPage } from "./components/admin/pages/AnalyticsPage"; 
import { SettingsPage } from "./components/admin/pages/SettingsPage";
import {FoodManagementPageUser } from "./components/dashboard/pages/FoodManagementPageuser";
import { ExercisePage } from "./components/dashboard/pages/ExercisePage";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />}/>
          <Route path="/exercises" element={<ExercisePage />} />
          <Route path="/food" element={<FoodManagementPageUser />} />
          <Route path="/goals" element={<GoalsPage />}/>
         <Route path="/checkin" element={<CheckInPage />} /> 
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/admin" element={<AdminDashboard/>} />
          <Route path="/reports/nutrition" element={<NutritionReportPage />} />
          <Route path="/reports/weight" element={<WeightProgressPage />} />
          <Route path="/reports/exercise" element={<ExerciseReportPage />} />
          <Route path="/admin/users" element={<UserManagementPage />} />
          <Route path="/admin/foods" element={<FoodManagementPage />} />
          <Route path="/admin/exercises" element={<ExerciseManagementPage />} />
          <Route path="/admin/analytics" element={<AnalyticsPage />} />
            <Route path="/admin/settings" element={<SettingsPage />} />
          
        </Routes>
        <Footer /> 
      </Router>
    </AuthProvider>
  );
}

export default App;