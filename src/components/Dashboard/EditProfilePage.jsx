import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../../context/ProfileContext";

export default function EditProfilePage() {
  const { profile, setProfile } = useContext(ProfileContext);
  const navigate = useNavigate();

  // Pre-fill fields with existing profile data
  const [name, setName] = useState(profile.name || "");
  const [gender, setGender] = useState(profile.gender || "Male");
  const [age, setAge] = useState(profile.age || 0);
  const [heightFt, setHeightFt] = useState(profile.heightFt || 0);
  const [heightIn, setHeightIn] = useState(profile.heightIn || 0);
  const [weightLbs, setWeightLbs] = useState(profile.weightLbs || 0);
  const [location, setLocation] = useState(profile.location || "");
  const [stateRegion, setStateRegion] = useState(profile.stateRegion || "");
  const [city, setCity] = useState(profile.city || "");
  const [zipCode, setZipCode] = useState(profile.zipCode || "");
  const [pageTitle, setPageTitle] = useState(profile.pageTitle || "");
  const [aboutMe, setAboutMe] = useState(profile.aboutMe || "");
  const [goalReason, setGoalReason] = useState(profile.goalReason || "");
  const [inspirations, setInspirations] = useState(profile.inspirations || "");

  const handleSave = () => {
    setProfile({
      ...profile,
      name,
      gender,
      age,
      heightFt,
      heightIn,
      weightLbs,
      location,
      stateRegion,
      city,
      zipCode,
      pageTitle,
      aboutMe,
      goalReason,
      inspirations,
    });

    navigate("/profile"); // Go back to profile
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="max-w-4xl w-full bg-white p-6 rounded-2xl shadow-lg mt-6">
        <h2 className="text-2xl font-bold mb-6 text-[#1D2D44]">
          Edit Your Profile
        </h2>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Height (ft)</label>
            <input
              type="number"
              value={heightFt}
              onChange={(e) => setHeightFt(Number(e.target.value))}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Height (in)</label>
            <input
              type="number"
              value={heightIn}
              onChange={(e) => setHeightIn(Number(e.target.value))}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Weight (lbs)</label>
            <input
              type="number"
              value={weightLbs}
              onChange={(e) => setWeightLbs(Number(e.target.value))}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block font-semibold mb-1">Location</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Country"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">State / Region</label>
            <input
              value={stateRegion}
              onChange={(e) => setStateRegion(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="State / Region"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">City</label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="City"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">
              ZIP / Postal Code
            </label>
            <input
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="ZIP Code"
            />
          </div>
        </div>

        {/* About Section */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block font-semibold mb-1">Page Title</label>
            <input
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Mom on a mission..."
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">About Me</label>
            <textarea
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
              className="w-full p-2 border rounded-lg"
              rows={3}
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">
              Why I want to get in shape
            </label>
            <textarea
              value={goalReason}
              onChange={(e) => setGoalReason(e.target.value)}
              className="w-full p-2 border rounded-lg"
              rows={3}
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">My Inspirations</label>
            <textarea
              value={inspirations}
              onChange={(e) => setInspirations(e.target.value)}
              className="w-full p-2 border rounded-lg"
              rows={3}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => navigate("/profile")}
            className="bg-gray-300 px-4 py-2 rounded-lg shadow hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-[#1D2D44] text-white px-6 py-2 rounded-lg shadow hover:bg-[#142030] transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
