import axios, { AxiosInstance } from 'axios';

function resolveBaseUrl(): string {
  // 1) Runtime global config (optional)
  try {
    if (typeof window !== 'undefined' && (window as any).__APP_CONFIG__?.API_URL) {
      return (window as any).__APP_CONFIG__.API_URL as string;
    }
  } catch {
    // ignore
  }

  // 2) Vite (import.meta.env) at build-time
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const viteEnv = (typeof import.meta !== 'undefined' ? (import.meta as any).env : undefined) as
      | { VITE_API_URL?: string; NEXT_PUBLIC_API_URL?: string }
      | undefined;
    if (viteEnv?.VITE_API_URL) return viteEnv.VITE_API_URL;
    if (viteEnv?.NEXT_PUBLIC_API_URL) return viteEnv.NEXT_PUBLIC_API_URL;
  } catch {
    // ignore
  }

  // 3) Next.js/Node (process.env) at build/SSR time
  if (typeof process !== 'undefined' && process.env) {
    if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
    if (process.env.VITE_API_URL) return process.env.VITE_API_URL;
  }

  // 4) Sensible production default, then dev fallback
  return 'https://neeiz-api.lslly.com';
}

export function createApiClient(baseURL: string): AxiosInstance {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
  });
  return instance;
}

export const apiClient = createApiClient(resolveBaseUrl());


