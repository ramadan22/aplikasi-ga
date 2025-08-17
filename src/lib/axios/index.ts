import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { getSessionAuth } from '../next-auth';

import { AuthTypes, ProfileTypes } from '@/services/authentication/authenticationTypes';
import { ResponseApiTypes } from '@/types/ResponseApi';

const AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
});

const onRequest = async (
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {
  const session = await getSessionAuth();
  const user = session?.user as (ProfileTypes & AuthTypes) | null;

  if (user && !config.headers.Authorization) {
    // config.headers.Authorization = `Bearer ${user?.accessToken}`;
  }

  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => Promise.reject(error);

const onResponse = (response: AxiosResponse): AxiosResponse => {
  if (response.status === 401) {
    // for signout if token expire or for refresh token
  }

  return response;
};

const onResponseError = (error: AxiosError) => Promise.reject(error);

AxiosInstance.interceptors.request.use(onRequest, onRequestError);
AxiosInstance.interceptors.response.use(
  (response: AxiosResponse) => onResponse(response),
  (error: AxiosError<ResponseApiTypes>) => {
    if (error.response?.data.status === 401) {
      // signOut({ callbackUrl: '/' });
    }
    return onResponseError(error);
  },
);

export default AxiosInstance;
