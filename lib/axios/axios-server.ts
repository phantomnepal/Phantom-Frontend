
import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Refresh management
let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

// Response interceptor
api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Only handle 401
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Prevent infinite retry
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // Wait if another request is already refreshing
    if (isRefreshing && refreshPromise) {
      try {
        await refreshPromise;
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    isRefreshing = true;

    refreshPromise = (async () => {
      try {
        // Browser automatically attaches HttpOnly refresh cookie
        // because this is a same-origin request.
        await api.post("/api/auth/refresh_token_route/", {});
      } finally {
        isRefreshing = false;
        refreshPromise = null;
      }
    })();

    try {
      await refreshPromise;

      // Retry original API request.
      // Browser automatically sends the updated cookie.
      return api(originalRequest);

    } catch (refreshError) {
      if (typeof window !== "undefined") {
        window.location.href = "/admin/login";
      }

      return Promise.reject(refreshError);
    }
  }
);

export default api;
