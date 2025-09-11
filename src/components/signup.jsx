import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate instead of Link
import calLogLogo from "../assets/img/calLogLogo.png"; // Your logo
import main2 from "../assets/img/main2.jpg";
import main4 from "../assets/img/main4.jpg";
import main6 from "../assets/img/main6.jpg";

const Signup = () => {
  const navigate = useNavigate(); // hook to navigate programmatically

  return (
    <div className="min-h-screen bg-white relative flex items-center justify-center overflow-hidden">
      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl px-10">
        {/* Navbar */}
        <nav className="relative z-20 flex justify-between items-center py-6">
          <div className="flex items-center gap-3">
            <img
              src={calLogLogo}
              alt="CalLogFit Logo"
              className="h-12 w-auto object-contain"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(16%) sepia(12%) saturate(1392%) hue-rotate(176deg) brightness(94%) contrast(89%)",
              }}
            />
          </div>

          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 rounded-full shadow hover:opacity-90 transition bg-[#1D2D44] text-white"
          >
            Login
          </button>
        </nav>

        {/* Hero Content */}
        <div className="relative z-20 flex flex-col md:flex-row justify-between items-center mt-20 gap-10">
          {/* Left Text */}
          <div className="max-w-lg text-[#1D2D44] flex flex-col items-center md:items-start animate-fade-up">
            <h1 className="text-5xl font-bold leading-tight mb-6 text-center md:text-left">
              Track Your Fitness <br /> Achieve Your Goals <br /> With Ease
            </h1>
            <p className="text-sm mb-8 text-center md:text-left text-gray-700">
              CalLogFit is your personal fitness companion. Log workouts,
              monitor progress, and stay motivated to achieve your health goals,
              all in one intuitive platform.
            </p>
            <button
              onClick={() => navigate("/signup/user-info")}
              className="px-10 py-4 rounded-full shadow-md hover:opacity-90 transition bg-[#1D2D44] text-white text-center"
            >
              Start Now
            </button>
          </div>

          {/* Right Cards */}
          <div className="flex gap-6 mt-10 md:mt-0 items-end">
            {[main2, main4, main6].map((imgSrc, idx) => (
              <div
                key={idx}
                className={`rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-200 transition-transform duration-500 hover:scale-105 animate-float`}
                style={{
                  width: idx === 1 ? "16rem" : "12rem", // Middle bigger
                  height: idx === 1 ? "26rem" : "22rem",
                  animationDelay: `${idx * 0.5}s`, // staggered float
                }}
              >
                <img
                  src={imgSrc}
                  alt={`Card ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fadeUp 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Signup;
