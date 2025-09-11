import { useContext, useEffect, useState } from "react";
import {
  FiHome,
  FiActivity,
  FiBarChart2,
  FiCoffee,
  FiBell,
  FiLogOut,
} from "react-icons/fi";
import { GiFire } from "react-icons/gi";
import { FaRunning, FaGlassWhiskey } from "react-icons/fa";
import { MdOutlineFitnessCenter } from "react-icons/md";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ProfileContext } from "../../context/ProfileContext";

import food1 from "../../assets/img/food1.png";
import food55 from "../../assets/img/food55.png";
import im3 from "../../assets/img/im3.png";
import im4 from "../../assets/img/im4.png";
import profile2 from "../../assets/img/profile2.png"; // Welcome card bg
import profile3 from "../../assets/img/profile3.png"; // Sidebar avatar fallback
import profile4 from "../../assets/img/profile4.png";
import profile5 from "../../assets/img/profile5.png";
import profile6 from "../../assets/img/profile6.png";
import calloglogo from "../../assets/img/calloglogo.png";
import appleImg from "../../assets/img/apple.png";
import bananaImg from "../../assets/img/banana.png";
import orangeImg from "../../assets/img/orange.png";
import grapeImg from "../../assets/img/grape.png";
import mangoImg from "../../assets/img/mango.png";
import strawberryImg from "../../assets/img/strawberry.png";

const Dashboard = () => {
  const { profile } = useContext(ProfileContext); //

  // ---- Notifications State ----
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    // Load messages from localStorage (or empty array if none)
    const storedMessages = JSON.parse(localStorage.getItem("messages")) || [];

    // Count only unblocked inbox messages
    const inboxCount = storedMessages.filter(
      (msg) => !msg.blocked && msg.from !== "You"
    ).length;

    setNotificationCount(inboxCount);
  }, []);

  const exercises = [
    { id: 1, name: "Exercise One", reps: "10 reps, 3 sets", img: food1 },
    { id: 2, name: "Exercise Two", reps: "10 reps, 3 sets", img: food55 },
    { id: 3, name: "Exercise Three", reps: "10 reps, 3 sets", img: im3 },
    { id: 4, name: "Exercise Four", reps: "10 reps, 3 sets", img: im4 },
    { id: 5, name: "Exercise Five", reps: "10 reps, 3 sets", img: food1 },
    { id: 6, name: "Exercise Six", reps: "10 reps, 3 sets", img: food55 },
    { id: 7, name: "Exercise Seven", reps: "10 reps, 3 sets", img: im3 },
    { id: 8, name: "Exercise Eight", reps: "10 reps, 3 sets", img: im4 },
  ];

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  // ---- Calculation logic ----
  const heightCm =
    (profile.heightFt || 0) * 30.48 + (profile.heightIn || 0) * 2.54;
  const weightKg = (profile.weightLbs || 0) * 0.453592;

  let bmr = 0;
  if (weightKg > 0 && heightCm > 0 && profile.age > 0) {
    if (profile.gender === "Male") {
      bmr = Math.round(10 * weightKg + 6.25 * heightCm - 5 * profile.age + 5);
    } else if (profile.gender === "Female") {
      bmr = Math.round(10 * weightKg + 6.25 * heightCm - 5 * profile.age - 161);
    }
  }

  const tdee = bmr ? Math.round(bmr * 1.55) : 0;
  const caloriesGoal = bmr ? Math.round(bmr * 1.2) : 0;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* TOP NAVBAR */}
      <header className="flex justify-between items-center bg-[#1D2D44] text-white shadow px-6 py-3">
        <div className="flex items-center gap-2">
          <img src={calloglogo} alt="Callog Logo" className="h-10 w-auto" />
        </div>
        <div className="flex items-center gap-6 text-sm">
          <div>{formattedDate}</div>
          <button className="relative" onClick={() => navigate("/sendmail")}>
            <FiBell className="text-xl" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {notificationCount}
              </span>
            )}
          </button>
          <button className="flex items-center gap-1 hover:text-red-400">
            <FiLogOut /> Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="w-64 bg-white shadow-lg rounded-lg overflow-hidden flex flex-col mt-4 ml-4 p-4">
          {/* Profile Section */}
          <div className="text-center mb-6 relative">
            <div className="w-20 h-20 mx-auto rounded-full p-1 bg-gradient-to-r from-[#1D2D44] to-[#FF6B6B] animate-pulse">
              <img
                src={profile.photo || profile3}
                alt={profile.name || "User"}
                className="w-full h-full rounded-full object-cover shadow-lg"
              />
            </div>

            <h2 className="mt-2 text-xl font-extrabold text-[#1D2D44]">
              {profile.name || "User"}
            </h2>

            <p className="text-gray-500 mt-1 text-sm">
              {profile.gender || "-"}, {profile.age || "-"} years
            </p>

            <div className="flex justify-center mt-4 gap-4">
              <div className="bg-[#F0F4FF] p-3 rounded-2xl flex flex-col items-center w-20 shadow-md hover:scale-105 transform transition">
                <p className="text-xs text-gray-500">HEIGHT</p>
                <p className="font-semibold text-sm">
                  {profile.heightFt || 0} ft {profile.heightIn || 0} in
                </p>
              </div>
              <div className="bg-[#FFF4E0] p-3 rounded-2xl flex flex-col items-center w-20 shadow-md hover:scale-105 transform transition">
                <p className="text-xs text-gray-500">WEIGHT</p>
                <p className="font-semibold text-sm">
                  {profile.weightLbs || 0} lbs
                </p>
              </div>
            </div>

            {/* Decorative Icon (Optional) */}
            <div className="mt-3 flex justify-center">
              <FaRunning className="text-[#1D2D44] text-xl animate-bounce" />
            </div>
          </div>

          {/* Navigation Buttons */}
          <nav className="flex flex-col gap-3 mt-6">
            {[
              {
                name: "Home",
                icon: <FiHome className="text-lg" />,
                path: "/home-summary",
              },
              {
                name: "Food",
                icon: <FiCoffee className="text-lg" />,
                path: "/food-diary",
              },
              {
                name: "Exercise",
                icon: <FiActivity className="text-lg" />,
                path: "/exercise-diary",
              },
              {
                name: "Progress Tracking",
                icon: <FiBarChart2 className="text-lg" />,
                path: "/progress-tracking",
              },
            ].map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="relative flex items-center gap-3 px-4 py-3 text-[#1D2D44] bg-gray-100 rounded-xl shadow-md hover:bg-gray-200 transform transition-all duration-300 hover:scale-105 group"
              >
                <span className="absolute left-0 top-0 h-full w-1 bg-[#1D2D44] rounded-l-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                {item.icon}
                <span className="font-semibold">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Achievement Box */}
          <div className="bg-gradient-to-r from-[#1D2D44] to-[#3C4A6B] text-white p-4 text-center text-sm mt-6 rounded-xl shadow-md">
            🎉 Congratulations!
            <br />
            You’ve unlocked the <strong>Expert</strong> level.
          </div>
        </aside>

        {/* MAIN SECTION */}
        <section className="flex-1 space-y-6 p-6">
          {/* Top Section: Welcome + Water */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Welcome Card */}
            <div
              className="flex-[2] relative p-6 rounded-3xl shadow-md h-[260px] flex flex-col justify-between overflow-hidden bg-top bg-cover bg-no-repeat"
              style={{ backgroundImage: `url(${profile2})` }}
            >
              <div className="relative z-10">
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400">
                  Welcome!
                </h1>
                <p className="mt-4 text-base md:text-lg text-white max-w-lg leading-relaxed">
                  Begin your fitness journey today.
                  <br />
                  Track workouts, join programs, and
                  <br /> enjoy a healthier lifestyle!
                </p>
              </div>

              <div className="absolute bottom-6 left-6 flex items-center gap-3 z-10">
                <div className="flex -space-x-2">
                  <img
                    src={profile3}
                    alt="member1"
                    className="w-6 h-6 rounded-full border-2 border-white"
                  />
                  <img
                    src={profile4}
                    alt="member2"
                    className="w-6 h-6 rounded-full border-2 border-white"
                  />
                  <img
                    src={profile5}
                    alt="member3"
                    className="w-6 h-6 rounded-full border-2 border-white"
                  />
                </div>

                <span className="font-semibold text-white">1k+ members</span>
              </div>

              <div className="absolute bottom-6 right-6 z-10">
                <button className="bg-white text-[#1D2D44] px-5 py-2 rounded-full font-semibold shadow hover:bg-gray-100 transition">
                  Start Free Trial
                </button>
              </div>

              <div className="absolute inset-0 bg-black opacity-30 rounded-3xl"></div>
            </div>

            {/* Water Intake Card */}
            <div className="flex-1 bg-gradient-to-r from-[#1D2D44] to-[#273554] p-6 rounded-3xl shadow-md flex flex-col justify-center items-center h-[260px] text-white gap-4">
              <FaGlassWhiskey className="text-4xl" />
              <p className="font-semibold text-xl">Daily Water Intake</p>
              <p className="text-lg font-bold">0 / 8 Glasses</p>
              <button className="bg-white text-[#1D2D44] px-6 py-2 rounded-full font-semibold shadow hover:bg-gray-100 transition">
                Log Water
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Card: Daily Summary */}
            <motion.div
              className="flex-1 bg-white rounded-3xl shadow-md flex justify-around items-center h-[250px] p-6 gap-4"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              {/* BMR */}
              <div className="flex-1 flex flex-col items-center gap-3 p-6 rounded-2xl text-[#1D2D44] bg-gradient-to-br from-[#A1C4FD] to-[#C2E9FB] h-[210px]">
                <MdOutlineFitnessCenter className="text-5xl p-4 bg-[#1D2D44] text-white rounded-full" />
                <p className="text-base font-semibold">BMR</p>
                <p className="text-2xl font-bold">{bmr || 0} kcal/day</p>
              </div>

              {/* Calories Goal */}
              <div className="flex-1 flex flex-col items-center gap-3 p-6 rounded-2xl text-[#1D2D44] bg-gradient-to-br from-[#FFD3B6] to-[#FFAAA5] h-[210px]">
                <GiFire className="text-5xl p-4 bg-[#1D2D44] text-white rounded-full" />
                <p className="text-base font-semibold">Calories Goal</p>
                <p className="text-2xl font-bold">
                  {caloriesGoal || 0} kcal/day
                </p>
              </div>

              {/* TDEE */}
              <div className="flex-1 flex flex-col items-center gap-3 p-6 rounded-2xl text-[#1D2D44] bg-gradient-to-br from-[#C1F0C1] to-[#95E1D3] h-[210px]">
                <FaRunning className="text-5xl p-4 bg-[#1D2D44] text-white rounded-full" />
                <p className="text-base font-semibold">TDEE</p>
                <p className="text-2xl font-bold">{tdee || 0} kcal/day</p>
              </div>
            </motion.div>

            {/* Right Card: Exercises Summary */}
            <motion.div
              className="flex-1 bg-gradient-to-r from-[#1D2D44] to-[#273554] text-white p-6 rounded-3xl shadow-md flex flex-col justify-between h-[250px]"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold">
                    {exercises.length} Exercises
                  </h3>
                  <p className="text-sm">1 hour 50 minutes</p>
                </div>
                {/* Enlarged Circle */}
                <div className="mt-4 w-28 h-28 border-4 border-white rounded-full flex items-center justify-center text-2xl font-bold">
                  5/{exercises.length}
                </div>
              </div>

              {/* Button fixed at the bottom */}
              <div className="mt-auto flex justify-end">
                <button className="px-4 py-2 text-sm bg-white text-[#273554] rounded-full shadow">
                  Change Exercises
                </button>
              </div>
            </motion.div>
          </div>

          {/* Food Section Header */}
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-bold text-[#1D2D44]">
              Food & Calories
            </h2>
            <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
              Track your daily food intake and see the calories for each item.
              Select your favorite foods to add them to your daily plan and
              maintain a balanced diet.
            </p>
          </div>

          {/* Food Flex Container */}
          <div className="flex flex-wrap justify-center gap-6 mt-6">
            {[
              { id: 1, name: "Apple", calories: 95, img: appleImg },
              { id: 2, name: "Banana", calories: 105, img: bananaImg },
              { id: 3, name: "Orange", calories: 62, img: orangeImg },
              { id: 4, name: "Strawberry", calories: 4, img: strawberryImg },
              { id: 5, name: "Grapes", calories: 62, img: grapeImg },
              { id: 6, name: "Mango", calories: 99, img: mangoImg },
            ].map((food, index) => (
              <motion.div
                key={food.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer w-64 flex flex-col"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.2,
                  duration: 1.2,
                  ease: "easeInOut",
                }}
              >
                {/* Food Image */}
                <div className="overflow-hidden rounded-t-2xl h-40 flex items-center justify-center bg-gray-50">
                  <img
                    src={food.img}
                    alt={food.name}
                    className="max-h-full w-auto object-contain transition-transform duration-700 hover:scale-110"
                  />
                </div>

                {/* Food Name & Calories */}
                <div className="p-4 flex flex-col items-center justify-center gap-2">
                  <h4 className="font-semibold text-lg text-[#1D2D44]">
                    {food.name}
                  </h4>
                  <p className="text-sm font-semibold text-white bg-[#1D2D44] px-3 py-1 rounded-full">
                    {food.calories} kcal
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
