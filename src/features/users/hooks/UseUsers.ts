// import {
//   deleteData,
//   get as getApi,
//   getById,
//   getByName,
//   post,
//   queries,
//   update,
// } from '@/services/asset';
import { get as getApi, post, queries } from '@/services/users';
// import {
//   DeleteMutationOptions,
//   PostMutationOptions,
//   PutMutationOptions,
// } from '@/services/asset/types/Request';
import { GetParams, PostMutationOptions } from '@/services/users/types/Request';
import { useMutation, useQuery } from '@tanstack/react-query';

export const Get = (params: GetParams = {}) =>
  useQuery({
    queryKey: [queries.GET_USERS, params],
    queryFn: () => getApi(params),
  });

export const Post = (options?: PostMutationOptions) =>
  useMutation({
    mutationFn: post,
    ...options,
  });

// export const GetByName = (params: GetParams = {}) =>
//   useQuery({
//     queryKey: [queries.GET_ASSETS_BY_NAME, params],
//     queryFn: () => getByName(params),
//   });

// export const GetById = (id: string, params: GetParams = {}) =>
//   useQuery({
//     queryKey: [queries.GET_ASSETS, { ...params, id }],
//     queryFn: () => getById(id, params),
//     enabled: !!id,
//   });

// export const Update = (options?: PutMutationOptions) =>
//   useMutation({
//     mutationFn: update,
//     ...options,
//   });

// export const Delete = (options?: DeleteMutationOptions) =>
//   useMutation({
//     mutationFn: deleteData,
//     ...options,
//   });
