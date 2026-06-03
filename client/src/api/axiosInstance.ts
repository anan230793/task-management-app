import axios from 'axios';

import { queryClient } from '../services/queryClient';

const baseURL = import.meta.env.VITE_API_URL as string;

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const status = error.response?.status;
    const requestUrl = error.config?.url;
    const isAuthRoute =
      requestUrl?.includes('/auth/me') ||
      requestUrl?.includes('/auth/login') ||
      requestUrl?.includes('/auth/register');

    if (status === 401 && !isAuthRoute) {
      queryClient.clear();
      window.location.replace('/login');
    }

    return Promise.reject(error);
  },
);
