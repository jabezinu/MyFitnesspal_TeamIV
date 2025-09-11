import React, { createContext, useState, useEffect } from "react";

export const ProfileContext = createContext();

const defaultProfile = {
  username: "ruhi4444",
  name: "New User",
  age: 22,
  gender: "Female",
  memberSince: new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }),
  location: "Ethiopia",
  stateRegion: "",
  city: "",
  zipCode: "",
  pageTitle: "",
  aboutMe: "",
  goalReason: "",
  inspirations: "",
  heightFt: 0,
  heightIn: 0,
  weightLbs: 0,
  photo: null,
};

export const ProfileProvider = ({ children }) => {
  // Load saved profile from localStorage
  const storedProfile = localStorage.getItem("profileData");

  const [profile, setProfile] = useState(
    storedProfile ? JSON.parse(storedProfile) : defaultProfile
  );

  // Persist profile to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("profileData", JSON.stringify(profile));
  }, [profile]);

  // Optional helper to reset profile to defaults
  const resetProfile = () => setProfile(defaultProfile);

  return (
    <ProfileContext.Provider value={{ profile, setProfile, resetProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
