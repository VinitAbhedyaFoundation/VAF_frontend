import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// ✅ REQUEST INTERCEPTOR (attach token)
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ RESPONSE INTERCEPTOR (handle errors globally)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // 🔥 token expired / unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem("token");

      // optional: redirect to login
      window.location.href = "/login";
    }

    // 🔥 forbidden (role issue)
    if (error.response?.status === 403) {
      console.error("Permission denied");
    }

    return Promise.reject(error);
  }
);

export default API;