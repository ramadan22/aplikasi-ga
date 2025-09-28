import AxiosInstance from '@/lib/axios';
import { ResponseApiTypes } from '@/types/ResponseApi';
import { Data } from './types';

const queries = {
  GET_PROFILE: 'GET_PROFILE',
};

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

export { getProfile, queries };
