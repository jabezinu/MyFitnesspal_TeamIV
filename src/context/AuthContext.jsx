// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // When token changes, fetch current user if endpoint exists
  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setUser(null);
        return;
      }
      try {
        // Adjust '/me' if your backend uses a different route
        const res = await api.get("/me");
        // adapt to response shape: res.data.user or res.data
        setUser(res.data.user ?? res.data);
      } catch (err) {
        console.error("Failed to load user:", err);
        // Token might be invalid — clear it
        setToken(null);
        localStorage.removeItem("token");
      }
    };
    loadUser();
  }, [token]);

  const register = async (payload) => {
    setLoading(true);
    try {
      const res = await api.post("/register", payload);
      // adapt to your backend response:
      // common: res.data.token OR res.data.access_token
      const newToken = res.data.token ?? res.data.access_token;
      if (newToken) {
        setToken(newToken);
        localStorage.setItem("token", newToken);
      }
      // optionally set user if returned
      if (res.data.user) setUser(res.data.user);
      setLoading(false);
      return res;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const login = async (payload) => {
    setLoading(true);
    try {
      const res = await api.post("/login", payload);
      const newToken = res.data.token ?? res.data.access_token;
      if (newToken) {
        setToken(newToken);
        localStorage.setItem("token", newToken);
      }
      if (res.data.user) setUser(res.data.user);
      setLoading(false);
      return res;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const logout = async () => {
    try {
      // If backend supports server-side logout/invalidate token:
      await api.post("/logout");
    } catch (e) {
      // ignore network errors on logout
    }
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
