import {
  deleteData,
  get as getApi,
  getById,
  getByName,
  post,
  queries,
  update,
} from '@/services/asset';
import {
  DeleteMutationOptions,
  GetParams,
  ID,
  PostError,
  PostInput,
  PostMutationOptions,
  PostOutput,
  UpdateMutationOptions,
} from '@/services/asset/types';
import { useMutation, useQuery } from '@tanstack/react-query';

export const Get = (params: GetParams = {}) =>
  useQuery({
    queryKey: [queries.GET_ASSETS, params],
    queryFn: () => getApi(params),
  });

export const GetByName = (params: GetParams = {}) =>
  useQuery({
    queryKey: [queries.GET_ASSETS_BY_NAME, params],
    queryFn: () => getByName(params),
  });

export const GetById = (id: string, params: GetParams = {}) =>
  useQuery({
    queryKey: [queries.GET_ASSETS, { ...params, id }],
    queryFn: () => getById(id, params),
    enabled: !!id,
  });

export const Post = (options?: PostMutationOptions) =>
  useMutation<PostOutput, PostError, PostInput>({
    mutationFn: post,
    ...options,
  });

export const Update = (options?: UpdateMutationOptions) =>
  useMutation<PostOutput, PostError, PostInput>({
    mutationFn: update,
    ...options,
  });

export const Delete = (options?: DeleteMutationOptions) =>
  useMutation<PostOutput, PostError, ID>({
    mutationFn: deleteData,
    ...options,
  });
