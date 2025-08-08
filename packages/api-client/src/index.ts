import axios, { AxiosInstance } from 'axios';

export function createApiClient(baseURL: string): AxiosInstance {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
  });
  return instance;
}

export const apiClient = createApiClient(
  (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_API_URL) ||
    (typeof process !== 'undefined' && process.env.VITE_API_URL) ||
    'http://localhost:3001'
);


