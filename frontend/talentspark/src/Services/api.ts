import axios from "axios";

// Read the API URL from the Vite environment variable
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000";

console.log("API_BASE_URL:", API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach the Bearer token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
export { API_BASE_URL };