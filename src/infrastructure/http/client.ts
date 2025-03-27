// src/infrastructure/http/client.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use(config => {
  // Add auth token, etc.
  return config;
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    // Global error handling
    return Promise.reject(error);
  }
);