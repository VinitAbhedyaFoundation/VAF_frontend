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

    // These endpoints do not need authentication
    const isPublicRequest =
      config.url === "/auth/register" ||
      config.url === "/auth/login";

    if (token && !isPublicRequest) {
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
    if (
      error.response?.status === 401 &&
      error.config?.url !== "/auth/login"
    ) {
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