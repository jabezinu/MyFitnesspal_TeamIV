import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";
import { AdminOverviewPage } from "./pages/AdminOverviewPage";
import { UserManagementPage } from "./pages/UserManagementPage";
import { FoodManagementPage } from "./pages/FoodManagementPage";
import { ExerciseManagementPage } from "./pages/ExerciseManagementPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { SettingsPage } from "./pages/SettingsPage";

export const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:inset-y-0 lg:z-50 lg:w-72 lg:overflow-y-auto lg:bg-white lg:shadow-md lg:rounded-lg lg:p-4">
        <AdminSidebar />
      </div>

      {/* Mobile Sidebar */}
      <AdminSidebar mobile isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 lg:pl-72">
        <div className="flex">
          {/* Content Area */}
          <div className="flex-1">
            <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
              <button type="button" className="-m-2.5 p-2.5 text-foreground lg:hidden" onClick={() => setSidebarOpen(true)}>
                <span className="sr-only">Open sidebar</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
              <div className="h-6 w-px bg-border lg:hidden" />
              <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                  <h1 className="text-lg font-semibold text-foreground">Admin Dashboard</h1>
                </div>
              </div>
            </div>

            <main className="py-6">
              <div className="px-4 sm:px-6 lg:px-8">
                <Routes>
                  <Route path="/" element={<AdminOverviewPage />} />
                  <Route path="/users" element={<UserManagementPage />} />
                  <Route path="/foods" element={<FoodManagementPage />} />
                  <Route path="/exercises" element={<ExerciseManagementPage />} />
                  <Route path="/analytics" element={<AnalyticsPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};