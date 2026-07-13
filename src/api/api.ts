import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:3000/api",
  timeout: 10000,
});
console.log(
  "API URL:",
  import.meta.env.VITE_API_URL
);
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
config.headers.set(
  "Authorization",
  `Bearer ${token}`
);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user");

      window.location.href = "/login";
    }

    if (error.response?.status === 403) {
      console.error("Permission denied");
    }

    return Promise.reject(error);
  }
);

export default API;