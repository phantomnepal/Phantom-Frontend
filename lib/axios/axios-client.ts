"use client";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000" ,
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Refresh management
let isRefreshing = false;

let refreshPromise: Promise<void> | null = null;

// Response interceptor
api.interceptors.response.use(
  // Successful response
  (response) => {
    return response;
  },

  async (error: AxiosError) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    // If there is no original request, reject
    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Only handle 401 errors
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Prevent infinite retry loops
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // If refresh is already running, wait for it
    if (isRefreshing && refreshPromise) {
      try {
        await refreshPromise;
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    // Start refresh process
    isRefreshing = true;

    refreshPromise = (async () => {
      try {
  


        await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/auth/refresh_token_route/`,
          {},
          // {
        
          //   withCredentials: true,
          // }
        );
      } finally {
        isRefreshing = false;
        refreshPromise = null;
      }
    })();

    try {
      await refreshPromise;

      // Retry original request.
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
