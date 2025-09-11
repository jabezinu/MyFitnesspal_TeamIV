import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast"; // <-- import toast
import calLogLogo from "../assets/img/calLogLogo.png";

const UserInfoForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const steps = 3;
  const currentStep = 1;

  const handleNext = () => {
    if (!firstName.trim() || !lastName.trim()) {
      toast.error("Please enter both first and last name."); // <-- toast instead of alert
      return;
    }
    navigate("/signup/goal", { state: { firstName, lastName } });
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {/* Toast container */}
      <Toaster position="top-center" reverseOrder={false} />

      <nav className="w-full bg-[#1D2D44] px-6 py-2 flex items-center shadow-md">
        <img src={calLogLogo} alt="Logo" className="h-10 w-auto" />
      </nav>

      <div className="flex flex-col items-center justify-center px-4 py-10">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 mt-10">
          {/* Step Indicators (dots only) */}
          <div className="flex justify-center gap-2 mb-6">
            {Array(steps)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i < currentStep ? "bg-[#1D2D44]" : "bg-gray-300"
                  }`}
                />
              ))}
          </div>

          <motion.h2
            className="text-xl font-semibold text-gray-900 mb-2 text-center"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            What's your name?
          </motion.h2>
          <motion.p
            className="text-sm text-gray-600 mb-6 text-center"
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            Welcome! Let’s get to know you.
          </motion.p>

          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-[#1D2D44]"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 mb-6 focus:outline-none focus:ring-2 focus:ring-[#1D2D44]"
          />

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/signup")}
              className="flex-1 py-3 rounded-lg border border-[#1D2D44] text-[#1D2D44] font-semibold hover:bg-[#f0f0f0] transition"
            >
              BACK
            </button>
            <button
              onClick={handleNext}
              className="flex-1 py-3 rounded-lg bg-[#1D2D44] text-white font-semibold hover:opacity-90 transition"
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserInfoForm;
