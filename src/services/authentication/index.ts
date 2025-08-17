import AxiosInstance from '@/lib/axios';
import { ResponseApiTypes } from '@/types/ResponseApi';
import {
  GetUsersParamsTypes,
  GetUsersResponseTypes,
  LoginResponseTypes,
  PayloadsRegisterTypes,
  PayloadsTypes,
  ProfileTypes,
} from './authenticationTypes';

export const Queries = {
  GET_USERS: 'GET_USERS',
  GET_STUDENTS: 'GET_STUDENTS',
};

export const authLogin = async (payload: PayloadsTypes) =>
  new Promise<ResponseApiTypes<LoginResponseTypes>>((resolve, reject) => {
    AxiosInstance.post('/auth/login', payload)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });

export const getProfile = async (accessToken?: string) =>
  new Promise<ResponseApiTypes<ProfileTypes>>((resolve, reject) => {
    const configHeaders = {} as { Authorization: string };

    if (accessToken) {
      configHeaders.Authorization = `Bearer ${accessToken}`;
    }

    AxiosInstance.get('/auth/profile', {
      headers: configHeaders,
    })
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });

export const getUsers = async (params: GetUsersParamsTypes) =>
  new Promise<ResponseApiTypes<GetUsersResponseTypes>>((resolve, reject) => {
    AxiosInstance.get('/auth/users', { params })
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });

export const postRegister = async (payload: PayloadsRegisterTypes) =>
  new Promise<ResponseApiTypes<{ data: null }>>((resolve, reject) => {
    AxiosInstance.post('/auth/register', payload)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
