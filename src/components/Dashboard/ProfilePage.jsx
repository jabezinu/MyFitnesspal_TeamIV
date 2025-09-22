import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../../context/ProfileContext";
import {
  FiEdit,
  FiArrowLeft,
  FiAward,
  FiTarget,
  FiActivity,
  FiUser,
  FiHeart,
  FiTrendingUp,
} from "react-icons/fi";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { profile } = useContext(ProfileContext);
  const [activeTab, setActiveTab] = useState("about");

  // Helper function to convert cm to feet and inches
  const cmToFeetInches = (cm) => {
    if (!cm || cm === 0) return { feet: 0, inches: 0 };
    const totalInches = cm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return { feet, inches };
  };

  // Helper function to convert kg to lbs
  const kgToLbs = (kg) => {
    if (!kg || kg === 0) return 0;
    return Math.round(kg * 2.20462);
  };

  // Calculate age from date of birth
  const calculateAge = (dob) => {
    if (!dob) return 0;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  // Process profile data
  const profileData = {
    name:
      profile?.first_name && profile?.last_name
        ? `${profile.first_name} ${profile.last_name}`
        : profile?.username || "New User",
    gender: profile?.profile?.sex || "",
    age: calculateAge(profile?.profile?.dob),
    height: profile?.profile?.height_cm
      ? cmToFeetInches(profile.profile.height_cm)
      : { feet: 0, inches: 0 },
    weight: profile?.profile?.current_weight_kg
      ? kgToLbs(profile.profile.current_weight_kg)
      : 0,
    goalWeight: profile?.profile?.goal_weight_kg
      ? kgToLbs(profile.profile.goal_weight_kg)
      : 0,
    photo: profile?.photo,
    city: profile?.profile?.city || "",
    stateRegion: profile?.profile?.state || "",
    aboutMe: profile?.profile?.about_me || "",
    goalReason: profile?.profile?.goal_reason || "",
    inspirations: profile?.profile?.inspirations || "",
    fitnessLevel: profile?.profile?.fitness_level || "Beginner",
    weeklyGoal: profile?.profile?.weekly_goal || "3 workouts per week",
  };

  // Calculate progress percentage
  const progressPercentage =
    profileData.weight && profileData.goalWeight
      ? Math.min(
          100,
          Math.round((profileData.weight / profileData.goalWeight) * 100)
        )
      : 0;

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center text-[#1D2D44] hover:text-[#2a3c58] transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold text-[#1D2D44]">My Profile</h1>
        <div className="w-10"></div> {/* Spacer for balance */}
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="relative">
          <div className="h-32 bg-gradient-to-r from-[#1D2D44] to-[#3C4A6B]"></div>

          <div className="absolute -bottom-12 left-8 flex items-end">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden">
                {profileData.photo ? (
                  <img
                    src={profileData.photo}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-[#1D2D44] to-[#3C4A6B] flex items-center justify-center text-white text-4xl font-bold">
                    {profileData.name.charAt(0)}
                  </div>
                )}
              </div>
              <button
                onClick={() => navigate("/edit-photos")}
                className="absolute bottom-2 right-2 bg-[#1D2D44] text-white p-2 rounded-full shadow-md hover:bg-[#2a3c58] transition-colors"
              >
                <FiEdit size={14} />
              </button>
            </div>

            <div className="ml-6 mb-4">
              <h2 className="text-2xl font-bold text-white drop-shadow-md">
                {profileData.name}
              </h2>
              {/* Added a semi-transparent background to improve text readability */}
              <div className="bg-black/20 px-3 py-1 rounded-full inline-block mt-1">
                <p className="text-white/95 drop-shadow-md text-sm font-medium">
                  {profileData.fitnessLevel} •{" "}
                  {profileData.city && `${profileData.city}, `}
                  {profileData.stateRegion}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-16 px-8 pb-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#F0F4FF] p-4 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">Age</p>
              <p className="text-xl font-semibold">
                {profileData.age || "-"} years
              </p>
            </div>
            <div className="bg-[#F0F4FF] p-4 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">Gender</p>
              <p className="text-xl font-semibold">
                {profileData.gender || "-"}
              </p>
            </div>
            <div className="bg-[#F0F4FF] p-4 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">Height</p>
              <p className="text-xl font-semibold">
                {profileData.height.feet || 0} ft{" "}
                {profileData.height.inches || 0} in
              </p>
            </div>
            <div className="bg-[#F0F4FF] p-4 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">Weight</p>
              <p className="text-xl font-semibold">
                {profileData.weight || 0} lbs
              </p>
            </div>
          </div>

          {/* Goal Progress */}
          <div className="bg-gradient-to-r from-[#1D2D44] to-[#3C4A6B] text-white p-6 rounded-2xl mb-8 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold flex items-center">
                Goal Progress
              </h3>
              <span className="text-sm">{progressPercentage}%</span>
            </div>

            <div className="w-full bg-white/20 rounded-full h-4 mb-2">
              <div
                className="bg-white h-4 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>

            <div className="flex justify-between text-sm">
              <span>Current: {profileData.weight || 0} lbs</span>
              <span>Goal: {profileData.goalWeight || 0} lbs</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`py-3 px-6 font-medium flex items-center ${
                activeTab === "about"
                  ? "text-[#1D2D44] border-b-2 border-[#1D2D44]"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("about")}
            >
              <FiUser className="mr-2" />
              About Me
            </button>
            <button
              className={`py-3 px-6 font-medium flex items-center ${
                activeTab === "goals"
                  ? "text-[#1D2D44] border-b-2 border-[#1D2D44]"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("goals")}
            >
              Goals & Motivation
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "about" && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-lg font-semibold text-[#1D2D44] mb-2">
                  About Me
                </h3>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                  {profileData.aboutMe ||
                    "I haven't filled this out yet. Click 'Edit Profile' to tell others about yourself!"}
                </p>
              </div>

              {/* Removed Fitness Level and Weekly Goal sections as requested */}
            </div>
          )}

          {activeTab === "goals" && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-lg font-semibold text-[#1D2D44] mb-2">
                  Why I Want to Get in Shape
                </h3>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                  {profileData.goalReason ||
                    "I haven't shared my motivation yet. Click 'Edit Profile' to add your reasons!"}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#1D2D44] mb-2">
                  My Inspirations
                </h3>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                  {profileData.inspirations ||
                    "I haven't added my inspirations yet. Click 'Edit Profile' to share what inspires you!"}
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => navigate("/edit-profile")}
              className="flex-1 bg-[#1D2D44] text-white px-6 py-3 rounded-lg shadow hover:bg-[#142030] transition flex items-center justify-center"
            >
              <FiEdit className="mr-2" />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
