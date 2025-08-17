import { GetParams } from '@/services/asset/types';
import { deleteData, get, getById, post, queries, update } from '@/services/category';
import {
  DeleteMutationOptions,
  ID,
  PostError,
  PostInput,
  PostMutationOptions,
  PostOutput,
  UpdateMutationOptions,
} from '@/services/category/types';
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
