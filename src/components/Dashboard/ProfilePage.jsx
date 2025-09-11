import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../../context/ProfileContext";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { profile } = useContext(ProfileContext);

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold mb-4 text-[#1D2D44]">
        {profile.name || "New User"}'s Profile
      </h2>

      <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
        {/* Profile Photo */}
        <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-6 overflow-hidden border-4 border-gray-200">
          {profile.photo ? (
            <img
              src={profile.photo}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <svg
              className="w-16 h-16 text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 12c2.761 0 5-2.239 5-5S14.761 2 12 2 7 4.239 7 7s2.239 5 5 5zm-7 8c0-3.314 2.686-6 6-6h2c3.314 0 6 2.686 6 6v1H5v-1z"
              />
            </svg>
          )}
        </div>

        
        <div>
          <p className="font-bold text-lg">{profile.name || "New User"}</p>
          <p>
            {profile.age || "-"} years old, {profile.gender || "-"}
          </p>
          <p>
            Height: {profile.heightFt || 0} ft {profile.heightIn || 0} in
          </p>
          <p>Weight: {profile.weightLbs || 0} lbs</p>
          {profile.city && (
            <p>
              {profile.city}, {profile.stateRegion} ({profile.location})
            </p>
          )}

          <div className="mt-4 flex flex-col gap-2">
            <button
              onClick={() => navigate("/edit-profile")}
              className="bg-[#1D2D44] text-white px-4 py-2 rounded-lg shadow hover:bg-[#142030] transition"
            >
              Edit Profile
            </button>
            <button
              onClick={() => navigate("/edit-photos")}
              className="bg-[#1D2D44] text-white px-4 py-2 rounded-lg shadow hover:bg-[#142030] transition"
            >
              Edit Photos
            </button>
          </div>
        </div>
      </div>

      {/* About Sections */}
      <div className="space-y-4">
        <div>
          <h3 className="text-[#1D2D44] font-semibold">About Me:</h3>
          <p className="italic text-gray-600">
            {profile.aboutMe || "I haven't filled this out yet."}
          </p>
        </div>
        <div>
          <h3 className="text-[#1D2D44] font-semibold">
            Why I want to get in shape:
          </h3>
          <p className="italic text-gray-600">
            {profile.goalReason || "I haven't filled this out yet."}
          </p>
        </div>
        <div>
          <h3 className="text-[#1D2D44] font-semibold">My Inspirations:</h3>
          <p className="italic text-gray-600">
            {profile.inspirations || "I haven't filled this out yet."}
          </p>
        </div>
      </div>

      {/* Navigation Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="mt-6 bg-gray-300 px-4 py-2 rounded-lg shadow hover:bg-gray-400 transition"
      >
        Back to Dashboard
      </button>
    </div>
  );
}
