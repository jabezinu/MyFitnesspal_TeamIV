import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../../context/ProfileContext";

export default function EditPhotosPage() {
  const { profile, setProfile } = useContext(ProfileContext);
  const [photo, setPhoto] = useState(profile.photo || null);
  const navigate = useNavigate();

  useEffect(() => {
    setPhoto(profile.photo || null);
  }, [profile.photo]);

 
  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      // Create a temporary URL for preview
      setPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Save photo to context and localStorage
  const handleUpload = () => {
    if (!photo) {
      alert("Please select a photo first!");
      return;
    }

    // Update context
    setProfile((prev) => ({
      ...prev,
      photo,
    }));

    // Navigate back to profile page
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="max-w-3xl w-full bg-white p-6 rounded-2xl shadow-lg mt-6">
        <h2 className="text-2xl font-bold mb-6 text-[#1D2D44]">
          Upload Your Profile Photo
        </h2>

        <div className="flex flex-col md:flex-row md:justify-between items-center bg-gray-50 p-6 rounded-lg">
          <p className="text-lg font-semibold text-center md:text-left mb-4 md:mb-0">
            {photo
              ? "Preview of your selected photo:"
              : "You have not uploaded a photo yet"}
          </p>

          <div className="flex flex-col items-center gap-3">
            {photo && (
              <img
                src={photo}
                alt="Selected"
                className="w-32 h-32 object-cover rounded-full mb-2 border"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="border p-2 rounded-lg"
            />
            <button
              onClick={handleUpload}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Save Photo
            </button>
          </div>
        </div>

        <button
          onClick={() => navigate("/profile")}
          className="mt-6 bg-gray-300 px-4 py-2 rounded-lg shadow hover:bg-gray-400 transition"
        >
          Back to Profile
        </button>
      </div>
    </div>
  );
}
