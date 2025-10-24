import { refreshToken } from '@/services/authentication';
import { ResponseApiTypes } from '@/types/ResponseApi';
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { signOut } from 'next-auth/react';

let isRefreshing = false;
let failedQueue: {
  resolve: (token?: string) => void;
  reject: (err: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token || '');
    }
  });
  failedQueue = [];
};

const AxiosInstance = axios.create({
  baseURL: '/api/proxy',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const onRequest = async (
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {
  if (!config.headers.Authorization) {
    try {
      const cookieUrl =
        typeof window === 'undefined'
          ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/cookie`
          : '/api/auth/cookie';

      const getCookie = await fetch(cookieUrl, { credentials: 'include' });
      const cookie = await getCookie.json();

      if (cookie?.accessToken) {
        config.headers.Authorization = `Bearer ${cookie.accessToken}`;
      }
    } catch (err) {
      console.error('Failed to fetch token', err);
    }
  }

  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => Promise.reject(error);

const onResponse = (response: AxiosResponse): AxiosResponse => response;

const onResponseError = async (error: AxiosError<ResponseApiTypes>) => {
  const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

  if (error.response?.status === 401 && !originalRequest._retry) {
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: token => {
            if (token && originalRequest.headers) {
              originalRequest.headers['Authorization'] = 'Bearer ' + token;
            }
            resolve(AxiosInstance(originalRequest));
          },
          reject,
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const getCookie = await fetch('/api/auth/cookie', { credentials: 'include' });
      const cookie = await getCookie.json();

      const res = await refreshToken(cookie?.refreshToken || '');
      const newAccessToken = res.data?.accessToken;

      if (!newAccessToken) throw new Error('No access token returned');

      originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;

      processQueue(null, newAccessToken);

      return AxiosInstance(originalRequest);
    } catch (err) {
      processQueue(err, null);
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }

  if (error.response?.data.status === 440) {
    signOut({ callbackUrl: '/' });
    return;
  }

  return Promise.reject(error);
};

AxiosInstance.interceptors.request.use(onRequest, onRequestError);
AxiosInstance.interceptors.response.use(onResponse, onResponseError);

export default AxiosInstance;
