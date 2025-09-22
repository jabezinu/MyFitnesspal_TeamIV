import React from "react";
import { Routes, Route } from "react-router-dom";

// Context
import { ProfileProvider } from "./context/ProfileContext";
import { MealsProvider } from "./context/MealsContext";
import { ExercisesProvider } from "./context/ExercisesContext";

// Pages & Components
import LandingHero from "./components/LandingHero";
import Login from "./components/Login";
import Signup from "./components/register/Signup";
import UserInfoForm from "./components/register/UserInfoForm";
import GoalForm from "./components/register/GoalForm";
import GoalConfirmation from "./components/register/GoalConfirmation";
import MaintainConfirmation from "./components/register/MaintainConfirmation";
import GainConfirmation from "./components/register/GainConfirmation";
import BarriersForm from "./components/register/BarriersForm";
import BarriersFormMaintain from "./components/register/BarriersFormMaintain";
import BarriersFormGain from "./components/register/BarriersFormGain";
import StyleStep from "./components/register/StyleStep";
import StyleStepMaintain from "./components/register/StyleStepMaintain";
import StyleStepGain from "./components/register/StyleStepGain";
import ActivityLevelForm from "./components/register/ActivityLevelForm";
import PersonalDetailsForm from "./components/register/PersonalDetailsForm";
import ResultsPage from "./components/ResultsPage";
import Contconvert from "./components/Contconvert";

// New Goal Pages
import LossW from "./components/register/LossW";
import Maintain from "./components/register/Maintain";
import GainW from "./components/register/GainW";

// New SignupFinalForm component
import SignupFinalForm from "./components/register/SignupFinalForm";

// New CreateUsername component
import CreateUsername from "./components/register/CreateUsername";

import Dashboard from "./components/Dashboard/Dashboard";
import HomeSummary from "./components/Dashboard/HomeSummary";
import SendMail from "./components/Dashboard/SendMail";

import EditProfilePage from "./components/Dashboard/EditProfilePage";
import EditPhotosPage from "./components/Dashboard/EditPhotosPage";
import ProfilePage from "./components/Dashboard/ProfilePage";

import FoodDiary from "./components/Dashboard/FoodDiary";
import FoodSearch from "./components/Dashboard/FoodSearch";
import QuickTool from "./components/Dashboard/QuickTool";

import ExerciseDiary from "./components/Dashboard/ExerciseDiary";
import CardioSearch from "./components/Dashboard/CardioSearch";
import StrengthSearch from "./components/Dashboard/StrengthSearch";

import ProgressTracking from "./components/Dashboard/ProgressTracking";
import Layout from "./components/Dashboard/Layout";

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

            {/* Final Signup Form */}
            <Route
              path="/signup/signup-final-form"
              element={<SignupFinalForm />}
            />

            {/* Create Username Page */}
            <Route
              path="/signup/create-username"
              element={<CreateUsername />}
            />

            {/* Results Page */}
            <Route path="/signup/results" element={<ResultsPage />} />

            {/* Dashboard & Summary */}
            <Route
              path="/dashboard"
              element={
                <Layout activeTab="Home">
                  <Dashboard />
                </Layout>
              }
            />
            <Route
              path="/home-summary"
              element={
                <Layout activeTab="Home">
                  <HomeSummary />
                </Layout>
              }
            />
            <Route
              path="/sendmail"
              element={
                <Layout showHeader={true} activeTab="">
                  <SendMail />
                </Layout>
              }
            />

            {/* Profile & Edit Pages */}
            <Route
              path="/profile"
              element={
                <Layout activeTab="">
                  <ProfilePage />
                </Layout>
              }
            />
            <Route
              path="/edit-profile"
              element={
                <Layout activeTab="">
                  <EditProfilePage />
                </Layout>
              }
            />
            <Route
              path="/edit-photos"
              element={
                <Layout activeTab="">
                  <EditPhotosPage />
                </Layout>
              }
            />

            {/* Food Diary */}
            <Route
              path="/food-diary"
              element={
                <Layout activeTab="Food">
                  <FoodDiary dailyGoal={dailyGoal} />
                </Layout>
              }
            />
            <Route
              path="/foodsearch"
              element={
                <Layout activeTab="Food">
                  <FoodSearch />
                </Layout>
              }
            />
            <Route
              path="/quicktool"
              element={
                <Layout activeTab="Food">
                  <QuickTool />
                </Layout>
              }
            />

            {/* Exercise */}
            <Route
              path="/exercise-diary"
              element={
                <Layout activeTab="Exercise">
                  <ExerciseDiary />
                </Layout>
              }
            />
            <Route
              path="/exercisesearch"
              element={
                <Layout activeTab="Exercise">
                  <CardioSearch />
                </Layout>
              }
            />
            <Route
              path="/strengthsearch"
              element={
                <Layout activeTab="Exercise">
                  <StrengthSearch />
                </Layout>
              }
            />

            {/* Progress Tracking */}
            <Route
              path="/progress-tracking"
              element={
                <Layout activeTab="Progress Tracking">
                  <ProgressTracking />
                </Layout>
              }
            />
          </Routes>
        </ExercisesProvider>
      </MealsProvider>
    </ProfileProvider>
  );
}
