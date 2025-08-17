import AxiosInstance from '@/lib/axios';
import { formatDateToWIB } from '@/lib/date-fns';
import { removeObjectKeys } from '@/utils';
import { Data, GetByIdResponse, GetParams, GetResponse, PostParams, PostResponse } from './types';

const queries = {
  GET_ASSETS: 'GET_ASSETS',
};

const get = async (params: GetParams = {}): Promise<GetResponse> =>
  new Promise((resolve, reject) => {
    AxiosInstance.get('/api/asset', {
      params,
    })
      .then(response => {
        const map = (response.data.data as Data[]).map(res => ({
          ...res,
          category: { value: res.id, label: res.name },
          createdAt: res.createdAt ? formatDateToWIB(res.createdAt) : '',
        }));

        resolve({
          ...response.data,
          data: map,
        });
      })
      .catch(error => reject(error?.response?.data || error));
  });

const getById = async (id: string, params: GetParams = {}): Promise<GetByIdResponse> =>
  new Promise((resolve, reject) => {
    AxiosInstance.get(`/api/asset/${id}`, {
      params,
    })
      .then(response => {
        const row: GetByIdResponse = {
          ...response.data.data,
          createdAt: formatDateToWIB(`${response.data.data?.createdAt}`),
        };

        resolve({
          ...response.data,
          data: row,
        });
      })
      .catch(error => reject(error?.response?.data || error));
  });

const post = async (params: PostParams): Promise<PostResponse> =>
  AxiosInstance.post('/api/asset', params).then(response => response?.data || null);

const update = async (params: PostParams): Promise<PostResponse> => {
  const id = params.id;
  return AxiosInstance.put(`/api/asset/${id}`, removeObjectKeys(params, ['id'])).then(
    response => response?.data || null,
  );
};

const deleteData = async (id: string): Promise<PostResponse> =>
  AxiosInstance.delete(`/api/asset/${id}`).then(response => response?.data || null);

export { deleteData, get, getById, post, queries, update };
