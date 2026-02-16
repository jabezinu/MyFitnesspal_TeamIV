import React, { useState } from "react";

export const RegisterForm = ({ onToggleMode }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }
    const userData = { name, email, password };
    localStorage.setItem("user", JSON.stringify(userData));
    alert("Registration successful!");
    onToggleMode(); // Switch to Sign In mode
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full border rounded-md p-2"
        />
      </div>
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
        className="w-full bg-green-600 text-white rounded-md p-2 hover:bg-green-700"
      >
        Sign Up
      </button>
      <p className="text-sm mt-2 text-center">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onToggleMode}
          className="text-green-600 underline"
        >
          Sign In
        </button>
      </p>
    </form>
  );
};