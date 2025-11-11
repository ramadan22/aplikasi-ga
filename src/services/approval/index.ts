import { RequestStatus } from '@/constants/Approval';
import AxiosInstance from '@/lib/axios';
import { removeObjectKeys } from '@/utils';
import {
  DataApprovers,
  GetApproversResponse,
  GetParams,
  GetResponse,
  GetResponseDetail,
  GetResponseReviewedSig,
  PostParams,
  PostResponse,
  UpdateParamSignature,
  UpdateResponseSignature,
} from './types';

const queries = {
  GET_APPROVALS: 'GET_APPROVALS',
  GET_APPROVALS_BY_NAME: 'GET_APPROVALS_BY_NAME',
  GET_APPROVERS: 'GET_APPROVERS',
  GET_REVIEWED_SIGNATURE: 'GET_REVIEWED_SIGNATURE',
};

const get = async (params: GetParams = {}): Promise<GetResponse> =>
  new Promise((resolve, reject) => {
    AxiosInstance.get('/approval', {
      params,
    })
      .then(response => resolve(response.data))
      .catch(error => reject(error?.response?.data || error));
  });

const getReviewedSignature = async (id: string): Promise<GetResponseReviewedSig> =>
  new Promise((resolve, reject) => {
    AxiosInstance.get(`/approval/signature-reviewed-position/${id}`)
      .then(response => resolve(response.data))
      .catch(error => reject(error?.response?.data || error));
  });

const detail = async (id: string): Promise<GetResponseDetail> =>
  new Promise((resolve, reject) => {
    AxiosInstance.get(`/approval/detail/${id}`)
      .then(response => resolve(response.data))
      .catch(error => reject(error?.response?.data || error));
  });

const getApprovers = async (params: GetParams = {}): Promise<GetApproversResponse> =>
  new Promise((resolve, reject) => {
    AxiosInstance.get('/approval/getApprovers', {
      params,
    })
      .then(response => {
        const map = (response.data.data as DataApprovers[]).map(res => ({
          label: res.fullName,
          value: res.id,
        }));

        resolve({
          ...response.data,
          data: map,
        });
      })
      .catch(error => reject(error?.response?.data || error));
  });

const post = async (params: PostParams): Promise<PostResponse> => {
  return AxiosInstance.post('/approval', removeObjectKeys(params, ['id'])).then(
    response => response?.data || null,
  );
};

const update = async (params: PostParams): Promise<PostResponse> => {
  const id = params.id;
  return AxiosInstance.put(`/approval/${id}`, removeObjectKeys(params, ['id'])).then(
    response => response?.data || null,
  );
};

const updateStatus = async ({
  id,
  status,
}: {
  id: string;
  status: RequestStatus;
}): Promise<unknown> => {
  const response = await AxiosInstance.put(`/approval/update-status/${id}`, { status });
  return response?.data || null;
};

const updatePositionSignature = async (
  params: UpdateParamSignature,
): Promise<UpdateResponseSignature> => {
  const id = params.id;
  return AxiosInstance.put(
    `/approval/update-position/${id}`,
    removeObjectKeys(params, ['id']),
  ).then(response => response?.data || null);
};

export {
  detail,
  get,
  getApprovers,
  getReviewedSignature,
  post,
  queries,
  update,
  updatePositionSignature,
  updateStatus,
};
