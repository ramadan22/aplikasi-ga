import AxiosInstance from '@/lib/axios';
import { useSessionStore } from '@/lib/zustand/SessionStore';
import { IPostChangePassword, IPostLogin, PostResponseLogin } from './types/Request';

export const authLogin = async (payload: IPostLogin) =>
  new Promise<PostResponseLogin>((resolve, reject) => {
    AxiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/api/authentication/login`, payload)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });

export const refreshToken = async (refreshToken: string) =>
  new Promise<PostResponseLogin>((resolve, reject) => {
    AxiosInstance.post<PostResponseLogin>(
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

export const changePassword = async (params: IPostChangePassword) =>
  AxiosInstance.post('/authentication/change-password', params).then(
    response => response?.data || null,
  );
