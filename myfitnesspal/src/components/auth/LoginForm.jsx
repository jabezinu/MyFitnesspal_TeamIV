import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export const LoginForm = ({ onToggleMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      if (storedUser.email === email && storedUser.password === password) {
        alert("Login successful!");
        navigate("/profile"); // Redirect to ProfilePage
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } else {
      alert("It seems you don't have an account. Redirecting to registration.");
      onToggleMode(); // Switch to Sign Up mode
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full border rounded-md p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 block w-full border rounded-md p-2"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700"
      >
        Sign In
      </button>
      <p className="text-sm mt-2 text-center">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onToggleMode}
          className="text-blue-600 underline"
        >
          Sign Up
        </button>
      </p>
    </form>
  );
};