import axios from "axios";

const BASE_URL = "https://fitnessappbackend-production.up.railway.app/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically (localStorage approach)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Optional: handle global 401 (redirect to login)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      // Optionally redirect:
      // window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;
