import AxiosInstance from '@/lib/axios';
import { formatDateToWIB } from '@/lib/date-fns';
import { removeObjectKeys } from '@/utils';
import { IAssetByName } from './types';
import {
  GetParams,
  GetResponse,
  GetResponseAssetsByName,
  GetResponseById,
  IPostParams,
  IPutParams,
  PostResponse,
  PutResponse,
} from './types/Request';

const queries = {
  GET_ASSETS: 'GET_ASSETS',
  GET_ASSETS_BY_NAME: 'GET_ASSETS_BY_NAME',
};

const get = async (params: GetParams = {}): Promise<GetResponse> =>
  new Promise((resolve, reject) => {
    AxiosInstance.get('/assets', {
      params: {
        ...params,
        size: params.limit,
      },
    })
      .then(response => resolve(response.data))
      .catch(error => reject(error?.response?.data || error));
  });

const getByName = async (params: GetParams = {}): Promise<GetResponseAssetsByName> =>
  new Promise((resolve, reject) => {
    AxiosInstance.get(`/assets/${params.name}`, {
      params: {
        ...removeObjectKeys(params, ['name']),
        size: params.limit,
      },
    })
      .then(response => {
        const map = (response.data.data as IAssetByName[]).map(res => ({
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

const getById = async (id: string, params: GetParams = {}): Promise<GetResponseById> =>
  new Promise((resolve, reject) => {
    AxiosInstance.get(`/assets/${id}`, {
      params,
    })
      .then(response => {
        const row: GetResponseById = {
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

const post = async (params: IPostParams): Promise<PostResponse> =>
  AxiosInstance.post('/assets', params).then(response => response?.data || null);

const update = async (params: IPutParams): Promise<PutResponse> => {
  const id = params.id;
  return AxiosInstance.put(`/assets/${id}`, removeObjectKeys({ ...params }, ['id'])).then(
    response => response?.data || null,
  );
};

const deleteData = async (id: string): Promise<PostResponse> =>
  AxiosInstance.delete(`/assets/${id}`).then(response => response?.data || null);

export { deleteData, get, getById, getByName, post, queries, update };
