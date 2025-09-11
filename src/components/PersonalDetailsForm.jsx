import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { FaMale, FaFemale } from "react-icons/fa";

const PersonalDetailsForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    firstName,
    lastName,
    goal,
    barriers,
    activityLevel,
    weightPounds: convWeight,
    heightFeet: convFeet,
    heightInches: convInches,
  } = location.state || {};

  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [weightPounds, setWeightPounds] = useState("");
  const [goalWeightPounds, setGoalWeightPounds] = useState("");
  const [goalError, setGoalError] = useState(false);

  useEffect(() => {
    // Redirect if firstName, lastName, or goal missing
    if (!firstName || !lastName || !goal) {
      navigate("/signup/user-info");
    }

    // If coming from conversion page, populate fields
    if (convWeight) setWeightPounds(convWeight);
    if (convFeet) setHeightFeet(convFeet);
    if (convInches) setHeightInches(convInches);
  }, [firstName, lastName, goal, convWeight, convFeet, convInches, navigate]);

  const calculateBMRAndCalories = () => {
    if (!birthDate || !weightPounds || !heightFeet || !heightInches || !gender)
      return {};

    const birth = new Date(birthDate);
    const now = new Date();
    const age = Math.floor((now - birth) / (1000 * 60 * 60 * 24 * 365.25));

    const weightKg = parseFloat(weightPounds) * 0.453592;
    const heightCm =
      parseFloat(heightFeet) * 30.48 + parseFloat(heightInches) * 2.54;

    const sexConst = gender === "Male" ? 5 : -161;
    const bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + sexConst;

    const activityMultipliers = {
      Sedentary: 1.2,
      "Lightly Active": 1.375,
      "Moderately Active": 1.55,
      "Very Active": 1.725,
      "Super Active": 1.9,
    };
    const multiplier = activityMultipliers[activityLevel] || 1.2;
    const dailyCalories = bmr * multiplier;

    let caloriesGoal = dailyCalories;
    if (goal === "Lose Weight") caloriesGoal = dailyCalories - 500;
    else if (goal === "Gain Weight") caloriesGoal = dailyCalories + 500;

    return { bmr, dailyCalories, caloriesGoal };
  };

  const handleNext = () => {
    if (
      !birthDate ||
      !weightPounds ||
      !heightFeet ||
      !heightInches ||
      !gender ||
      !goalWeightPounds
    ) {
      return toast.error("Please fill in all fields.");
    }

    const current = parseFloat(weightPounds);
    const goalWeight = parseFloat(goalWeightPounds);

    setGoalError(false);

    if (goal === "Lose Weight" && goalWeight >= current) {
      setGoalError(true);
      return toast.error("Goal weight must be less than current weight.");
    }

    if (goal === "Gain Weight" && goalWeight <= current) {
      setGoalError(true);
      return toast.error("Goal weight must be greater than current weight.");
    }

    const { bmr, dailyCalories, caloriesGoal } = calculateBMRAndCalories();

    // Determine which page to go next based on goal
    if (goal === "Lose Weight") {
      navigate("/signup/lossW", {
        state: {
          firstName,
          lastName,
          goal,
          barriers,
          activityLevel,
          gender,
          country,
          birthDate,
          heightFeet,
          heightInches,
          weightPounds,
          goalWeightPounds,
          bmr,
          dailyCalories,
          caloriesGoal,
        },
      });
    } else if (goal === "Gain Weight") {
      navigate("/signup/gainW", {
        state: {
          firstName,
          lastName,
          goal,
          barriers,
          activityLevel,
          gender,
          country,
          birthDate,
          heightFeet,
          heightInches,
          weightPounds,
          goalWeightPounds,
          bmr,
          dailyCalories,
          caloriesGoal,
        },
      });
    } else if (goal === "Maintain Weight") {
      navigate("/signup/maintain", {
        state: {
          firstName,
          lastName,
          goal,
          barriers,
          activityLevel,
          gender,
          country,
          birthDate,
          heightFeet,
          heightInches,
          weightPounds,
          goalWeightPounds,
          bmr,
          dailyCalories,
          caloriesGoal,
        },
      });
    }
  };

  const handleBack = () => {
    navigate("/signup/activity", {
      state: { firstName, lastName, goal, barriers, activityLevel },
    });
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <motion.div
        className="min-h-screen flex items-center justify-center bg-gray-50 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="bg-white rounded-3xl shadow-xl w-full max-w-5xl p-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Progress & Title */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-600">
                Step 3 of 4
              </span>
              <span className="text-sm text-[#1D2D44] font-bold">
                Personal Details
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#1D2D44] h-2 rounded-full"
                style={{ width: "75%" }}
              ></div>
            </div>
          </div>

          {/* Display Selected Activity Level */}
          <div className="mb-6 text-center">
            <p className="text-gray-700 text-lg">
              <strong>Selected Activity Level:</strong> {activityLevel || "-"}
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">
            Tell us more about yourself
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* LEFT */}
            <div className="space-y-6">
              {/* Gender */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Select Your Gender
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Male", icon: <FaMale /> },
                    { label: "Female", icon: <FaFemale /> },
                  ].map((option) => (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      key={option.label}
                      onClick={() => setGender(option.label)}
                      className={`flex flex-col items-center p-5 border rounded-xl cursor-pointer transition shadow-sm ${
                        gender === option.label
                          ? "bg-[#1D2D44] text-white border-[#1D2D44] shadow-md"
                          : "bg-white text-gray-700 hover:shadow-md"
                      }`}
                    >
                      <div className="text-2xl mb-1">{option.icon}</div>
                      <span className="text-sm font-medium">
                        {option.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Country */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Country
                </h3>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full p-4 border rounded-xl focus:outline-none"
                >
                  <option value="">Choose your country</option>
                  <option value="Ethiopia">Ethiopia</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                </select>
              </div>

              {/* DOB */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Date of Birth
                </h3>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full p-4 border rounded-xl focus:outline-none"
                />
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-6">
              {/* Height */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Height
                </h3>
                <div className="flex gap-3">
                  <input
                    type="number"
                    placeholder="Feet"
                    value={heightFeet}
                    onChange={(e) => setHeightFeet(e.target.value)}
                    className="w-24 p-4 border rounded-xl focus:outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Inches"
                    value={heightInches}
                    onChange={(e) => setHeightInches(e.target.value)}
                    className="w-24 p-4 border rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              {/* Current Weight */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Current Weight (lbs)
                </h3>
                <input
                  type="number"
                  placeholder="Current Weight"
                  value={weightPounds}
                  onChange={(e) => setWeightPounds(e.target.value)}
                  className="w-full p-4 border rounded-xl focus:outline-none"
                />
              </div>

              {/* Goal Weight */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Goal Weight (lbs)
                </h3>
                <input
                  type="number"
                  placeholder="Goal Weight"
                  value={goalWeightPounds}
                  onChange={(e) => setGoalWeightPounds(e.target.value)}
                  className={`w-full p-4 border rounded-xl focus:outline-none ${
                    goalError ? "border-red-500 bg-red-50" : ""
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-center mt-10">
            <button
              onClick={handleBack}
              className="flex-1 py-3 border border-[#1D2D44] text-[#1D2D44] rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              BACK
            </button>
            <button
              onClick={handleNext}
              className="flex-1 py-3 bg-[#1D2D44] text-white rounded-lg font-semibold hover:bg-[#152033] transition"
            >
              NEXT
            </button>
          </div>

          {/* Conversion Link Below Buttons */}
          <div className="text-center mt-4">
            <button
              onClick={() => navigate("/signup/convert-units")}
              className="text-[#1D2D44] font-semibold hover:underline"
            >
              Don’t know your weight or height in lbs/ft? Click here
            </button>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default PersonalDetailsForm;
