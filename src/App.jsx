import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Context
import { ProfileProvider } from "./context/ProfileContext";
import { MealsProvider } from "./context/MealsContext";
import { ExercisesProvider } from "./context/ExercisesContext";

// Pages & Components
import LandingHero from "./components/LandingHero";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserInfoForm from "./components/UserInfoForm";
import GoalForm from "./components/GoalForm";
import GoalConfirmation from "./components/GoalConfirmation";
import MaintainConfirmation from "./components/MaintainConfirmation";
import GainConfirmation from "./components/GainConfirmation";
import BarriersForm from "./components/BarriersForm";
import BarriersFormMaintain from "./components/BarriersFormMaintain";
import BarriersFormGain from "./components/BarriersFormGain";
import StyleStep from "./components/StyleStep";
import StyleStepMaintain from "./components/StyleStepMaintain";
import StyleStepGain from "./components/StyleStepGain";
import ActivityLevelForm from "./components/ActivityLevelForm";
import PersonalDetailsForm from "./components/PersonalDetailsForm";
import ResultsPage from "./components/ResultsPage";
import Contconvert from "./components/Contconvert";

// New Goal Pages
import LossW from "./components/LossW";
import Maintain from "./components/Maintain";
import GainW from "./components/GainW";

// Dashboard Components
import Dashboard from "./components/Dashboard/Dashboard";
import HomeSummary from "./components/Dashboard/HomeSummary";
import SendMail from "./components/Dashboard/SendMail";

// New Profile Pages
import EditProfilePage from "./components/Dashboard/EditProfilePage";
import EditPhotosPage from "./components/Dashboard/EditPhotosPage";
import ProfilePage from "./components/Dashboard/ProfilePage";

// Food Diary & Search
import FoodDiary from "./components/Dashboard/FoodDiary";
import FoodSearch from "./components/Dashboard/FoodSearch";
import QuickTool from "./components/Dashboard/QuickTool";

// Exercise Diary & Database
import ExerciseDiary from "./components/Dashboard/ExerciseDiary";
import CardioSearch from "./components/Dashboard/CardioSearch";
import StrengthSearch from "./components/Dashboard/StrengthSearch";

// Progress Tracking
import ProgressTracking from "./components/Dashboard/ProgressTracking";

import "./index.css";

export default function App() {
  const dailyGoal = {
    calories: 1520,
    carbs: 190,
    fat: 51,
    protein: 76,
    sodium: 2300,
    sugar: 57,
  };

  return (
    <ProfileProvider>
      <MealsProvider>
        <ExercisesProvider>
          <Router>
            <Routes>
              {/* Landing & Auth */}
              <Route path="/" element={<LandingHero />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Signup Steps */}
              <Route path="/signup/user-info" element={<UserInfoForm />} />
              <Route path="/signup/goal" element={<GoalForm />} />
              <Route
                path="/signup/goal-confirmation"
                element={<GoalConfirmation />}
              />
              <Route
                path="/signup/maintain-confirmation"
                element={<MaintainConfirmation />}
              />
              <Route
                path="/signup/gain-confirmation"
                element={<GainConfirmation />}
              />
              <Route path="/signup/barriers" element={<BarriersForm />} />
              <Route
                path="/signup/barriers-maintain"
                element={<BarriersFormMaintain />}
              />
              <Route
                path="/signup/barriers-gain"
                element={<BarriersFormGain />}
              />
              <Route path="/signup/style" element={<StyleStep />} />
              <Route
                path="/signup/style-maintain"
                element={<StyleStepMaintain />}
              />
              <Route path="/signup/style-gain" element={<StyleStepGain />} />
              <Route path="/signup/activity" element={<ActivityLevelForm />} />
              <Route
                path="/signup/personal-details"
                element={<PersonalDetailsForm />}
              />
              <Route path="/signup/convert-units" element={<Contconvert />} />

              {/* New Goal Pages between PersonalDetailsForm and Results */}
              <Route path="/signup/lossW" element={<LossW />} />
              <Route path="/signup/maintain" element={<Maintain />} />
              <Route path="/signup/gainW" element={<GainW />} />

              {/* Results Page */}
              <Route path="/signup/results" element={<ResultsPage />} />

              {/* Dashboard & Summary */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/home-summary"
                element={
                  <HomeSummary
                    user={{
                      name: "New User",
                      gender: "Male",
                      age: 28,
                      heightFt: 6,
                      heightIn: 1,
                      weightLbs: 176,
                    }}
                  />
                }
              />
              <Route path="/sendmail" element={<SendMail />} />

              {/* Profile & Edit Pages */}
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/edit-profile" element={<EditProfilePage />} />
              <Route path="/edit-photos" element={<EditPhotosPage />} />

              {/* Food Diary */}
              <Route
                path="/food-diary"
                element={
                  <FoodDiary
                    dailyGoal={dailyGoal}
                    selectedDate="Tuesday, September 9, 2025"
                  />
                }
              />
              <Route path="/foodsearch" element={<FoodSearch />} />
              <Route path="/quicktool" element={<QuickTool />} />

              {/* Exercise */}
              <Route path="/exercise-diary" element={<ExerciseDiary />} />
              <Route path="/exercisesearch" element={<CardioSearch />} />
              <Route path="/strengthsearch" element={<StrengthSearch />} />

              {/* Progress Tracking */}
              <Route path="/progress-tracking" element={<ProgressTracking />} />
            </Routes>
          </Router>
        </ExercisesProvider>
      </MealsProvider>
    </ProfileProvider>
  );
}
