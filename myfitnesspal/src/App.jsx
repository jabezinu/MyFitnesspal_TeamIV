import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext'; 
import { HomePage } from "./components/dashboard/pages/HomePage";
import { ExerciseManagementPage } from "./components/admin/pages/ExerciseManagementPage";
import { FoodManagementPage } from "./components/admin/pages/FoodManagementPage";
import  ProfilePage  from "./components/admin/pages/ProfilePage";
import { Footer } from "./components/dashboard/pages/Footer";
import GoalsPage from "./components/dashboard/pages/GoalsPage";
import { CheckInPage } from "./components/dashboard/pages/CheckInPage";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/exercises" element={<ExerciseManagementPage />} />
          <Route path="/food" element={<FoodManagementPage />} />
          <Route path="/profile" element={<ProfilePage />}/>
          <Route path="/goals" element={<GoalsPage />}/>
         <Route path="/checkin" element={<CheckInPage />} /> 
        </Routes>
        <Footer /> 
      </Router>
    </AuthProvider>
  );
}
export default App;