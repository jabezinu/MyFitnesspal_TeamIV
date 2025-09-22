import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const foundUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (foundUser) {
        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        navigate("/dashboard");
      } else {
        alert("Invalid email or password");
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white shadow-xl rounded-3xl overflow-hidden flex w-full max-w-5xl transform transition-all duration-300 hover:shadow-2xl">
        {/* Left Section - Form */}
        <div className="flex-1 p-10 flex flex-col justify-center bg-white">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#1D2D44] to-[#3E5C76] bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Sign in to continue your journey with us
            </p>
          </div>

          {/* Animated Decorations */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-[#1D2D44] opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 bg-[#3E5C76] opacity-10 rounded-full animate-bounce"></div>

          {/* Form Container */}
          <div className="relative z-10">
            {/* Email Field */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your email"
                className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1D2D44] transition-all duration-300"
              />
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your password"
                  className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1D2D44] transition-all duration-300"
                />
                <span
                  className="absolute right-4 top-4 cursor-pointer text-gray-500 hover:text-[#1D2D44] transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁"}
                </span>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-[#1D2D44] focus:ring-[#1D2D44] border-gray-300 rounded cursor-pointer"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-gray-700 cursor-pointer"
                >
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-sm text-[#1D2D44] hover:text-[#3E5C76] transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className={`w-full py-4 rounded-xl font-medium text-white transition-all duration-300 flex items-center justify-center ${
                isLoading
                  ? "bg-[#748CAB] cursor-not-allowed"
                  : "bg-gradient-to-r from-[#1D2D44] to-[#3E5C76] hover:from-[#0D1B2A] hover:to-[#1D2D44] hover:shadow-lg"
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>

            {/* Divider */}
            <div className="relative flex items-center my-8">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-400">New here?</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Register Link */}
            <div className="text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-[#1D2D44] hover:text-[#3E5C76] transition-colors"
                >
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Visuals */}
        <div className="hidden md:flex flex-1 bg-gradient-to-br from-[#1D2D44] to-[#3E5C76] flex-col items-center justify-center p-10 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="smallGrid"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 20 0 L 0 0 0 20"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#smallGrid)" />
            </svg>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white opacity-10 rounded-full animate-float"></div>
          <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white opacity-10 rounded-full animate-float animation-delay-2000"></div>
          <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-white opacity-10 rounded-full animate-float animation-delay-4000"></div>

          {/* Content */}
          <div className="relative z-10 text-center text-white">
            <h2 className="text-3xl font-bold mb-6">Unlock Your Potential</h2>
            <p className="text-lg opacity-90 mb-8">
              Access your personalized dashboard and continue your journey
              towards success.
            </p>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
              <img
                src="https://img.freepik.com/free-vector/secure-login-concept-illustration_114360-4582.jpg?w=826&t=st=1702991623~exp=1702992223~hmac=2e6d6d6b1d3b1a8c8b4d4c4e4f4a4b4c4d4e4f4a4b4c4d4e4f4a4b4c4d4e4f4a4b"
                alt="Secure Login"
                className="w-64 h-auto mx-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Add custom animations */}
      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
