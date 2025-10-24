import AxiosInstance from '@/lib/axios';
import { formatDateToWIB } from '@/lib/date-fns';
import { removeObjectKeys } from '@/utils';
import {
  DataAssetsByName,
  GetByIdResponse,
  GetParams,
  GetResponse,
  GetResponseAssetsByName,
  PostParams,
  PostResponse,
} from './types';

const queries = {
  GET_ASSETS: 'GET_ASSETS',
  GET_ASSETS_BY_NAME: 'GET_ASSETS_BY_NAME',
};

const get = async (params: GetParams = {}): Promise<GetResponse> =>
  new Promise((resolve, reject) => {
    AxiosInstance.get('/assets', {
      params,
    })
      .then(response => resolve(response.data))
      .catch(error => reject(error?.response?.data || error));
  });

const getByName = async (params: GetParams = {}): Promise<GetResponseAssetsByName> =>
  new Promise((resolve, reject) => {
    AxiosInstance.get(`/assets/${params.name}`, {
      params: removeObjectKeys(params, ['name']),
    })
      .then(response => {
        const map = (response.data.data as DataAssetsByName[]).map(res => ({
          ...res,
          createdAt: formatDateToWIB(res.createdAt),
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
    AxiosInstance.get(`/assets/${id}`, {
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
  AxiosInstance.post('/assets', params).then(response => response?.data || null);

const update = async (params: PostParams): Promise<PostResponse> => {
  const id = params.id;
  return AxiosInstance.put(`/assets/${id}`, removeObjectKeys(params, ['id'])).then(
    response => response?.data || null,
  );
};

const deleteData = async (id: string): Promise<PostResponse> =>
  AxiosInstance.delete(`/assets/${id}`).then(response => response?.data || null);

export { deleteData, get, getById, getByName, post, queries, update };
