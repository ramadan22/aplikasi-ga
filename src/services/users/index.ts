import AxiosInstance from '@/lib/axios';
import { formatDateToWIB } from '@/lib/date-fns';
import { ResponseApiTypes } from '@/types/ResponseApi';
import { removeObjectKeys } from '@/utils';
import { IUser } from './types';
import { GetParams, IPostParams, IPutParams, IPutResponse } from './types/Request';

const queries = {
  GET_USERS: 'GET_USERS',
  GET_PROFILE: 'GET_PROFILE',
};

const get = async (params: GetParams = {}): Promise<ResponseApiTypes<IUser[]>> =>
  new Promise((resolve, reject) => {
    const size = params.limit;
    const updateParams = removeObjectKeys(params, ['exceptUserId', 'limit']);

    AxiosInstance.get('/users', {
      params: {
        ...updateParams,
        size,
      },
    })
      .then(response => {
        const map = (response.data.data as IUser[])
          .filter(row => row.id !== params.exceptUserId)
          .map(res => ({
            ...res,
            createdAt: formatDateToWIB(res.createdAt),
            updatedAt: res.updatedAt ? formatDateToWIB(res.updatedAt) : null,
          }));

        resolve({
          ...response.data,
          data: map,
        });
      })
      .catch(error => reject(error?.response?.data || error));
  });

const post = async (params: IPostParams) =>
  AxiosInstance.post('/users/register', params).then(response => response?.data || null);

const getProfile = async (token?: string, id?: string) =>
  new Promise<ResponseApiTypes<IUser>>((resolve, reject) => {
    const configHeaders = {} as { Authorization: string };
    let url = token ? `${process.env.NEXT_PUBLIC_API_URL}/api/users/profile` : '/users/profile';

    if (id) url += `/${id}`;

    if (token) {
      configHeaders.Authorization = `Bearer ${token}`;
    }

    AxiosInstance.get(url, {
      headers: configHeaders,
    })
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });

const update = async (params: IPutParams): Promise<IPutResponse> => {
  const id = params.id;
  return AxiosInstance.put(`/users/${id}`, removeObjectKeys({ ...params }, ['id'])).then(
    response => response?.data || null,
  );
};

export { get, getProfile, post, queries, update };
