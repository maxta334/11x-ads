import axios from "axios";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";
import config from "@/config";
import { logger } from "./logger";

const apiClient = axios.create({
  baseURL: "/api",
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    // You could add auth headers here if needed
    return config;
  },
  (error) => {
    logger.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    let message = "";

    if (error.code === 'ECONNABORTED') {
      message = 'Request timed out. Please try again.';
    } else if (!error.response) {
      message = 'Network error. Please check your connection.';
    } else if (error.response?.status === 401) {
      message = 'Please login to continue';
      redirect(config.auth.loginUrl);
    } else if (error.response?.status === 403) {
      message = 'You need to upgrade your plan to use this feature';
    } else if (error.response?.status === 429) {
      message = 'Too many requests. Please try again later.';
    } else if (error.response?.status >= 500) {
      message = 'Server error. Please try again later.';
    } else {
      message = error?.response?.data?.error || error.message || 'Something went wrong';
    }

    error.message = typeof message === "string" ? message : JSON.stringify(message);

    // Log error in production with sensitive info removed
    logger.error('API Error:', {
      status: error.response?.status,
      message: error.message,
      path: error.config?.url,
      method: error.config?.method
    });

    // Show error to user
    toast.error(error.message);
    
    return Promise.reject(error);
  }
);

export default apiClient;
