import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../../context/ProfileContext";

export default function EditProfilePage() {
  const { profile, setProfile } = useContext(ProfileContext);
  const navigate = useNavigate();

  // Convert API data to form-friendly format
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    sex: "male",
    dob: "",
    country: "",
    region: "",
    city: "",
    postal_code: "",
    height_cm: 0,
    current_weight_kg: 0,
    goal_weight_kg: 0,
    activity_level: "moderate",
    email_opt_in: 1,
    timezone: "UTC",
    water_goal_ml: 2000,
    page_title: "",
    about_me: "",
    why_get_in_shape: "",
    inspirations: "",
    daily_calorie_goal: 0,
  });

  // State for calculated values
  const [calculatedValues, setCalculatedValues] = useState({
    bmr: 0,
    tdee: 0,
    suggestedCalorieGoal: 0,
  });

  // Pre-fill fields when profile data is available
  useEffect(() => {
    // First try to get data from localStorage (from CreateUsername)
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};

    let initialData = {};

    if (currentUser && Object.keys(currentUser).length > 0) {
      // Use data from CreateUsername (localStorage)
      initialData = {
        first_name: currentUser.first_name || "",
        last_name: currentUser.last_name || "",
        username: currentUser.username || "",
        sex: currentUser.profile?.sex || "male",
        dob: currentUser.profile?.dob || "",
        country: currentUser.profile?.country || "",
        region: currentUser.profile?.region || "",
        city: currentUser.profile?.city || "",
        postal_code: currentUser.profile?.postal_code || "",
        height_cm: currentUser.profile?.height_cm
          ? parseFloat(currentUser.profile.height_cm)
          : 0,
        current_weight_kg: currentUser.profile?.current_weight_kg
          ? parseFloat(currentUser.profile.current_weight_kg)
          : 0,
        goal_weight_kg: currentUser.profile?.goal_weight_kg
          ? parseFloat(currentUser.profile.goal_weight_kg)
          : 0,
        activity_level: currentUser.profile?.activity_level || "moderate",
        email_opt_in: currentUser.profile?.email_opt_in || 1,
        timezone: currentUser.profile?.timezone || "UTC",
        water_goal_ml: currentUser.profile?.water_goal_ml || 2000,
        page_title: currentUser.profile?.page_title || "",
        about_me: currentUser.profile?.about_me || "",
        why_get_in_shape: currentUser.profile?.why_get_in_shape || "",
        inspirations: currentUser.profile?.inspirations || "",
        daily_calorie_goal: currentUser.profile?.daily_calorie_goal || 0,
      };
    } else if (profile) {
      // Fallback to profile context data
      initialData = {
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        username: profile.username || "",
        sex: profile.profile?.sex || "male",
        dob: profile.profile?.dob || "",
        country: profile.profile?.country || "",
        region: profile.profile?.region || "",
        city: profile.profile?.city || "",
        postal_code: profile.profile?.postal_code || "",
        height_cm: profile.profile?.height_cm
          ? parseFloat(profile.profile.height_cm)
          : 0,
        current_weight_kg: profile.profile?.current_weight_kg
          ? parseFloat(profile.profile.current_weight_kg)
          : 0,
        goal_weight_kg: profile.profile?.goal_weight_kg
          ? parseFloat(profile.profile.goal_weight_kg)
          : 0,
        activity_level: profile.profile?.activity_level || "moderate",
        email_opt_in: profile.profile?.email_opt_in || 1,
        timezone: profile.profile?.timezone || "UTC",
        water_goal_ml: profile.profile?.water_goal_ml || 2000,
        page_title: profile.profile?.page_title || "",
        about_me: profile.profile?.about_me || "",
        why_get_in_shape: profile.profile?.why_get_in_shape || "",
        inspirations: profile.profile?.inspirations || "",
        daily_calorie_goal: profile.profile?.daily_calorie_goal || 0,
      };
    }

    setFormData(initialData);
    // Calculate values with the new form data
    calculateHealthMetrics(initialData);
  }, [profile]);

  // Calculate health metrics when relevant form data changes
  useEffect(() => {
    calculateHealthMetrics(formData);
  }, [
    formData.sex,
    formData.dob,
    formData.height_cm,
    formData.current_weight_kg,
    formData.activity_level,
  ]);

  // Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
  const calculateBMR = (weight, height, age, gender) => {
    if (weight <= 0 || height <= 0 || age <= 0) return 0;

    if (gender === "male") {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
  };

  // Calculate TDEE (Total Daily Energy Expenditure) based on activity level
  const calculateTDEE = (bmr, activityLevel) => {
    const activityMultipliers = {
      sedentary: 1.2, // Little to no exercise
      light: 1.375, // Light exercise 1-3 days/week
      moderate: 1.55, // Moderate exercise 3-5 days/week
      active: 1.725, // Hard exercise 6-7 days/week
      very_active: 1.9, // Very hard exercise, physical job
    };

    return bmr * (activityMultipliers[activityLevel] || 1.55);
  };

  // Calculate suggested calorie goal based on weight goal
  const calculateCalorieGoal = (tdee, currentWeight, goalWeight) => {
    if (goalWeight <= 0 || currentWeight <= 0) return Math.round(tdee);

    const weightDifference = currentWeight - goalWeight;

    if (Math.abs(weightDifference) < 0.5) {
      // Maintain weight
      return Math.round(tdee);
    } else if (weightDifference > 0) {
      // Lose weight (deficit of 500 calories/day ≈ 0.5kg/week)
      return Math.round(tdee - 500);
    } else {
      // Gain weight (surplus of 500 calories/day ≈ 0.5kg/week)
      return Math.round(tdee + 500);
    }
  };

  // Calculate all health metrics
  const calculateHealthMetrics = (data) => {
    const age = calculateAge(data.dob);
    const bmr = calculateBMR(
      data.current_weight_kg,
      data.height_cm,
      age,
      data.sex
    );
    const tdee = calculateTDEE(bmr, data.activity_level);
    const suggestedCalorieGoal = calculateCalorieGoal(
      tdee,
      data.current_weight_kg,
      data.goal_weight_kg
    );

    setCalculatedValues({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      suggestedCalorieGoal,
    });

    // Auto-update the calorie goal if it hasn't been manually set
    if (!data.daily_calorie_goal || data.daily_calorie_goal === 0) {
      setFormData((prev) => ({
        ...prev,
        daily_calorie_goal: suggestedCalorieGoal,
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNumberInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === "" ? 0 : parseFloat(value),
    }));
  };

  const handleSave = async () => {
    try {
      // Prepare data for API update
      const updateData = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        username: formData.username,
        profile: {
          sex: formData.sex,
          dob: formData.dob,
          country: formData.country,
          region: formData.region,
          city: formData.city,
          postal_code: formData.postal_code,
          height_cm: formData.height_cm,
          current_weight_kg: formData.current_weight_kg,
          goal_weight_kg: formData.goal_weight_kg,
          activity_level: formData.activity_level,
          email_opt_in: formData.email_opt_in,
          timezone: formData.timezone,
          water_goal_ml: formData.water_goal_ml,
          page_title: formData.page_title,
          about_me: formData.about_me,
          why_get_in_shape: formData.why_get_in_shape,
          inspirations: formData.inspirations,
          daily_calorie_goal: formData.daily_calorie_goal,
          // Store calculated values for display elsewhere
          bmr: calculatedValues.bmr,
          tdee: calculatedValues.tdee,
        },
      };

      // Get authentication token
      const token = localStorage.getItem("userToken");

      // Send update request to API
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        const updatedProfile = await response.json();
        setProfile(updatedProfile);

        // Also update localStorage with the new data
        const updatedUser = {
          ...updateData,
          profile: {
            ...updateData.profile,
          },
        };
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));

        // Trigger custom event to notify Layout component
        window.dispatchEvent(new CustomEvent("userDataUpdated"));

        navigate("/profile");
      } else {
        console.error("Failed to update profile");
        // Fallback to local update if API fails
        const updatedProfile = {
          ...profile,
          ...updateData,
          profile: {
            ...profile?.profile,
            ...updateData.profile,
          },
        };
        setProfile(updatedProfile);

        // Update localStorage as well
        localStorage.setItem("currentUser", JSON.stringify(updatedProfile));

        // Trigger custom event to notify Layout component
        window.dispatchEvent(new CustomEvent("userDataUpdated"));

        navigate("/profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      // Fallback to local update
      const updatedProfile = {
        ...profile,
        first_name: formData.first_name,
        last_name: formData.last_name,
        username: formData.username,
        profile: {
          ...profile?.profile,
          sex: formData.sex,
          dob: formData.dob,
          country: formData.country,
          region: formData.region,
          city: formData.city,
          postal_code: formData.postal_code,
          height_cm: formData.height_cm,
          current_weight_kg: formData.current_weight_kg,
          goal_weight_kg: formData.goal_weight_kg,
          activity_level: formData.activity_level,
          email_opt_in: formData.email_opt_in,
          timezone: formData.timezone,
          water_goal_ml: formData.water_goal_ml,
          page_title: formData.page_title,
          about_me: formData.about_me,
          why_get_in_shape: formData.why_get_in_shape,
          inspirations: formData.inspirations,
          daily_calorie_goal: formData.daily_calorie_goal,
          bmr: calculatedValues.bmr,
          tdee: calculatedValues.tdee,
        },
      };
      setProfile(updatedProfile);

      // Update localStorage as well
      localStorage.setItem("currentUser", JSON.stringify(updatedProfile));

      // Trigger custom event to notify Layout component
      window.dispatchEvent(new CustomEvent("userDataUpdated"));

      navigate("/profile");
    }
  };

  // Helper function to convert cm to feet and inches
  const cmToFeetInches = (cm) => {
    const totalInches = cm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return { feet, inches };
  };

  // Helper function to convert kg to lbs
  const kgToLbs = (kg) => {
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

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-[#1D2D44] border-b pb-2">
          Edit Your Profile
        </h2>

        {/* Basic Info Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-[#1D2D44]">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                First Name
              </label>
              <input
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="First Name"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Last Name
              </label>
              <input
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Last Name"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Username
              </label>
              <input
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Username"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Gender
              </label>
              <select
                name="sex"
                value={formData.sex}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Age
              </label>
              <input
                value={calculateAge(formData.dob)}
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                disabled
              />
            </div>
          </div>
        </div>

        {/* Body Metrics Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-[#1D2D44]">
            Body Metrics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Height (cm)
              </label>
              <input
                type="number"
                name="height_cm"
                value={formData.height_cm}
                onChange={handleNumberInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                step="0.1"
                min="0"
              />
              <div className="text-sm text-gray-50 mt-1 pl-1">
                {formData.height_cm > 0
                  ? `${cmToFeetInches(formData.height_cm).feet} ft ${
                      cmToFeetInches(formData.height_cm).inches
                    } in`
                  : "Enter height in centimeters"}
              </div>
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Current Weight (kg)
              </label>
              <input
                type="number"
                name="current_weight_kg"
                value={formData.current_weight_kg}
                onChange={handleNumberInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                step="0.1"
                min="0"
              />
              <div className="text-sm text-gray-50 mt-1 pl-1">
                {formData.current_weight_kg > 0
                  ? `${kgToLbs(formData.current_weight_kg)} lbs`
                  : "Enter weight in kilograms"}
              </div>
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Goal Weight (kg)
              </label>
              <input
                type="number"
                name="goal_weight_kg"
                value={formData.goal_weight_kg}
                onChange={handleNumberInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                step="0.1"
                min="0"
              />
              <div className="text-sm text-gray-50 mt-1 pl-1">
                {formData.goal_weight_kg > 0
                  ? `${kgToLbs(formData.goal_weight_kg)} lbs`
                  : "Enter goal weight in kilograms"}
              </div>
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Activity Level
              </label>
              <select
                name="activity_level"
                value={formData.activity_level}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="sedentary">
                  Sedentary (little to no exercise)
                </option>
                <option value="light">Light (exercise 1-3 days/week)</option>
                <option value="moderate">
                  Moderate (exercise 3-5 days/week)
                </option>
                <option value="active">Active (exercise 6-7 days/week)</option>
                <option value="very_active">
                  Very Active (hard exercise daily)
                </option>
              </select>
            </div>

            {/* Calculated Metrics Display */}
            <div className="md:col-span-2 p-4 bg-blue-50 rounded-lg mt-4">
              <h4 className="font-semibold text-blue-800 mb-2">
                Calculated Metrics
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-medium text-sm text-gray-700">
                    BMR
                  </label>
                  <div className="text-lg font-bold text-blue-800">
                    {calculatedValues.bmr} calories
                  </div>
                  <p className="text-xs text-gray-500">Basal Metabolic Rate</p>
                </div>
                <div>
                  <label className="block font-medium text-sm text-gray-700">
                    TDEE
                  </label>
                  <div className="text-lg font-bold text-blue-800">
                    {calculatedValues.tdee} calories
                  </div>
                  <p className="text-xs text-gray-500">
                    Total Daily Energy Expenditure
                  </p>
                </div>
                <div>
                  <label className="block font-medium text-sm text-gray-700">
                    Suggested Calorie Goal
                  </label>
                  <div className="text-lg font-bold text-blue-800">
                    {calculatedValues.suggestedCalorieGoal} calories
                  </div>
                  <p className="text-xs text-gray-500">
                    Based on your goal weight
                  </p>
                </div>
              </div>
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Water Goal (ml)
              </label>
              <input
                type="number"
                name="water_goal_ml"
                value={formData.water_goal_ml}
                onChange={handleNumberInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
              />
            </div>
            <div>
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    daily_calorie_goal: calculatedValues.suggestedCalorieGoal,
                  }))
                }
                className="mt-2 text-sm text-blue-600 hover:text-blue-800"
              >
                Use Suggested Value
              </button>
            </div>

            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                name="email_opt_in"
                checked={formData.email_opt_in}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    email_opt_in: e.target.checked ? 1 : 0,
                  }))
                }
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-2 font-medium text-gray-700">
                Email Opt-in
              </label>
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-[#1D2D44]">
            Location
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Country
              </label>
              <input
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Country"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Region/State
              </label>
              <input
                name="region"
                value={formData.region}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Region/State"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                City
              </label>
              <input
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="City"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Postal Code
              </label>
              <input
                name="postal_code"
                value={formData.postal_code}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Postal Code"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Timezone
              </label>
              <select
                name="timezone"
                value={formData.timezone}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="UTC">UTC</option>
                <option value="EST">Eastern Time (EST)</option>
                <option value="CST">Central Time (CST)</option>
                <option value="MST">Mountain Time (MST)</option>
                <option value="PST">Pacific Time (PST)</option>
                {/* Add more timezones as needed */}
              </select>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-[#1D2D44]">
            About Me
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Page Title
              </label>
              <input
                name="page_title"
                value={formData.page_title}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Mom on a mission..."
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                About Me
              </label>
              <textarea
                name="about_me"
                value={formData.about_me}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Tell us about yourself..."
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Why I want to get in shape
              </label>
              <textarea
                name="why_get_in_shape"
                value={formData.why_get_in_shape}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="What motivates you to get in shape?"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                My Inspirations
              </label>
              <textarea
                name="inspirations"
                value={formData.inspirations}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Who or what inspires you?"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-8 pt-6 border-t justify-end">
          <button
            onClick={() => navigate("/profile")}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg shadow hover:bg-gray-400 transition font-medium"
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-[#1D2D44] text-white px-6 py-2 rounded-lg shadow hover:bg-[#142030] transition font-medium"
            type="button"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
