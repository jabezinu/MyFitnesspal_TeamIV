import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import log10 from "../assets/img/log10.svg";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      // Save the logged-in user
      localStorage.setItem("currentUser", JSON.stringify(foundUser));

      // Navigate to dashboard
      navigate("/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="bg-white shadow-lg rounded-3xl overflow-hidden flex w-full max-w-5xl">
        {/* Left Section */}
        <div className="flex-1 p-10 flex flex-col justify-center bg-white">
          <h2 className="text-3xl font-bold text-[#3d4a64] mb-2">Login</h2>
          <p className="text-gray-500 mb-8">
            If You Are Already A Member, Easily Log In
          </p>

          {/* Email */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          {/* Password */}
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              👁
            </span>
          </div>

          
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="remember"
              className="mr-2 accent-[#3d4a64] cursor-pointer"
            />
            <label
              htmlFor="remember"
              className="text-sm text-gray-600 cursor-pointer"
            >
              Remember Me
            </label>
          </div>

          
          <button
            onClick={handleLogin}
            className="w-full bg-[#3d4a64] text-white py-3 rounded-lg font-medium hover:bg-[#2c384f] transition"
          >
            Login
          </button>

          
          <div className="flex items-center my-6">
            <hr className="flex-1 border-gray-300" />
            <span className="mx-4 text-gray-400">OR</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Google Login */}
          <button className="w-full flex items-center justify-center border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition">
            <FcGoogle className="text-xl mr-2" /> Login with Google
          </button>

          {/* Links */}
          <p className="mt-6 text-sm text-gray-500 cursor-pointer hover:underline">
            Forgot my password
          </p>
          <p className="mt-2 text-sm text-gray-500">
            If You Don't Have An Account, Create{" "}
            <span className="text-[#3d4a64] font-medium cursor-pointer hover:underline">
              Register
            </span>
          </p>
        </div>

        {/* Right Section */}
        <div className="flex-1 bg-white flex flex-col items-center justify-center p-10">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <img src={log10} alt="Logo" className="w-96 h-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
