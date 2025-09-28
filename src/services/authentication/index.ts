import AxiosInstance from '@/lib/axios';
import { useSessionStore } from '@/lib/zustand/SessionStore';
import { ResponseApiTypes } from '@/types/ResponseApi';
import { AxiosError } from 'axios';
import { LoginResponseTypes, PayloadsTypes, ProfileTypes } from './types';
import { PostParams } from './types/ChangePassword';

export const authLogin = async (payload: PayloadsTypes) =>
  new Promise<ResponseApiTypes<LoginResponseTypes>>((resolve, reject) => {
    AxiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/api/authentication/login`, payload)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });

export const refreshToken = async (refreshToken: string) =>
  new Promise<ResponseApiTypes<LoginResponseTypes>>((resolve, reject) => {
    AxiosInstance.post<ResponseApiTypes<LoginResponseTypes>>(
      '/authentication/refresh-token',
      {},
      { headers: { Authorization: `Bearer ${refreshToken}` } },
    )
      .then(response => {
        useSessionStore.getState().updateSessionToken(response.data.data?.accessToken || '');

        resolve(response.data);
      })
      .catch(error => reject(error));
  });

export const setTokenCookie = async ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) =>
  new Promise((resolve, reject) => {
    AxiosInstance.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/cookie`,
      { accessToken, refreshToken },
      {
        withCredentials: true,
      },
    )
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });

export const changePassword = async (params: PostParams): Promise<ResponseApiTypes<ProfileTypes>> =>
  new Promise((resolve, reject) => {
    AxiosInstance.post<ResponseApiTypes>('/authentication/change-password', params)
      .then(response => resolve(response.data))
      .catch((error: AxiosError<ResponseApiTypes>) => reject(error.response?.data));
  });
