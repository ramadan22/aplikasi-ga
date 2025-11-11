import AxiosInstance from '@/lib/axios';
import { ResponseApiTypes } from '@/types/ResponseApi';
import { removeObjectKeys } from '@/utils';
import { Data, GetParams } from './types';

const queries = {
  GET_USERS: 'GET_USERS',
  GET_PROFILE: 'GET_PROFILE',
};

const get = async (params: GetParams = {}): Promise<ResponseApiTypes<Data[]>> =>
  new Promise((resolve, reject) => {
    const updateParams = removeObjectKeys(params, ['exceptUserId']);

    AxiosInstance.get('/users', {
      params: updateParams,
    })
      .then(response => {
        const map = (response.data.data as Data[])
          .filter(row => row.id !== params.exceptUserId)
          .map(res => ({
            ...res,
          }));

        resolve({
          ...response.data,
          data: map,
        });
      })
      .catch(error => reject(error?.response?.data || error));
  });

const getProfile = async (token?: string) =>
  new Promise<ResponseApiTypes<Data>>((resolve, reject) => {
    const configHeaders = {} as { Authorization: string };
    const url = token ? `${process.env.NEXT_PUBLIC_API_URL}/api/users/profile` : '/users/profile';

    if (token) {
      configHeaders.Authorization = `Bearer ${token}`;
    }

    AxiosInstance.get(url, {
      headers: configHeaders,
    })
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });

export { get, getProfile, queries };
