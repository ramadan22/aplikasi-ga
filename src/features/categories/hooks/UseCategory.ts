// import { GetParams } from '@/services/asset/types';
import { deleteData, get, getById, post, queries, update } from '@/services/category';
import {
  DeleteMutationOptions,
  GetParams,
  PostMutationOptions,
  PutMutationOptions,
} from '@/services/category/types/Request';
import { useMutation, useQuery } from '@tanstack/react-query';

export const Get = (params: GetParams = {}) =>
  useQuery({
    queryKey: [queries.GET_CATEGORIES, params],
    queryFn: () => get(params),
  });

export const GetById = (id: string, params: GetParams = {}) =>
  useQuery({
    queryKey: [queries.GET_CATEGORIES, { ...params, id }],
    queryFn: () => getById(id, params),
    enabled: !!id,
  });

export const Post = (options?: PostMutationOptions) =>
  useMutation({
    mutationFn: post,
    ...options,
  });

export const Update = (options?: PutMutationOptions) =>
  useMutation({
    mutationFn: update,
    ...options,
  });

export const Delete = (options?: DeleteMutationOptions) =>
  useMutation({
    mutationFn: deleteData,
    ...options,
  });
