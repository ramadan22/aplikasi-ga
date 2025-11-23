import AxiosInstance from '@/lib/axios';
import { formatDateToWIB } from '@/lib/date-fns';
import { removeObjectKeys } from '@/utils';
import { ICategory } from './types';
import {
  GetByIdResponse,
  GetParams,
  GetResponse,
  IDeleteResponse,
  IPostParams,
  IPutParams,
  IPutResponse,
} from './types/Request';

const queries = {
  GET_CATEGORIES: 'GET_CATEGORIES',
};

const get = async (params: GetParams = {}): Promise<GetResponse> =>
  new Promise((resolve, reject) => {
    AxiosInstance.get('/category', {
      params,
    })
      .then(response => {
        const map = (response.data.data as ICategory[]).map(res => ({
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
    AxiosInstance.get(`/category/${id}`, {
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

const post = async (params: IPostParams) =>
  AxiosInstance.post('/category', params).then(response => response?.data || null);

const update = async (params: IPutParams): Promise<IPutResponse> => {
  const id = params.id;
  return AxiosInstance.put(`/category/${id}`, removeObjectKeys({ ...params }, ['id'])).then(
    response => response?.data || null,
  );
};

const deleteData = async (id: string): Promise<IDeleteResponse> =>
  AxiosInstance.delete(`/category/${id}`).then(response => response?.data || null);

export { deleteData, get, getById, post, queries, update };
