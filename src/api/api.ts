
import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000/api";

const API = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
});

// Keep the CSRF token in memory only.
let csrfToken: string | null = null;
let csrfTokenRequest: Promise<string> | null = null;

const getCsrfToken = async (): Promise<string> => {
  if (csrfToken) {
    return csrfToken;
  }

  if (!csrfTokenRequest) {
    csrfTokenRequest = axios
      .get<{ csrfToken: string }>("/auth/csrf", {
        baseURL,
        timeout: 10000,
        withCredentials: true,
      })
      .then((response) => {
        csrfToken = response.data.csrfToken;
        return csrfToken;
      })
      .finally(() => {
        csrfTokenRequest = null;
      });
  }

  return csrfTokenRequest;
};

// Attach CSRF token to every state-changing request.
API.interceptors.request.use(async (config) => {
  const method = config.method?.toUpperCase();

  const requiresCsrf = [
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
  ].includes(method || "");

  if (requiresCsrf) {
    const token = await getCsrfToken();

    config.headers.set("X-CSRF-Token", token);
  }

  return config;
});

// Capture rotated CSRF tokens returned by login endpoints.
API.interceptors.response.use(
  (response) => {
    const newCsrfToken = response.data?.csrfToken;

    if (typeof newCsrfToken === "string") {
      csrfToken = newCsrfToken;
    }

    // Clear the in-memory token after logout.
    if (response.config.url === "/auth/logout") {
      csrfToken = null;
    }

    return response;
  },

  (error) => {
    const requestUrl = error.config?.url || "";

    const isPublicRequest =
      requestUrl === "/auth/login" ||
      requestUrl === "/auth/adminlogin" ||
      requestUrl === "/auth/register";

    if (
      error.response?.status === 401 &&
      !isPublicRequest
    ) {
      window.location.href = "/login";
    }

    if (error.response?.status === 403) {
      console.error("Permission denied or CSRF validation failed");
    }

    return Promise.reject(error);
  }
);

export default API;
