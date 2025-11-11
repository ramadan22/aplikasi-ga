import { RequestStatus } from '@/constants/Approval';
import { RoleLabel } from '@/constants/Role';
import {
  get as getApi,
  getApprovers,
  getReviewedSignature,
  post,
  queries as queriesApproval,
  update,
  updateStatus,
} from '@/services/approval';
import {
  GetParams,
  PostError,
  PostInput,
  PostMutationOptions,
  PostOutput,
  UpdateMutationOptions,
} from '@/services/approval/types';
import { get as getUsers, queries as queriesUsers } from '@/services/users';
import { GetParams as UserGetParams } from '@/services/users/types';
import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';

export const Get = (params: GetParams = {}) =>
  useQuery({
    queryKey: [queriesApproval.GET_APPROVALS, params],
    queryFn: () => getApi(params),
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

export const GetApprovers = (params: GetParams = {}) =>
  useQuery({
    queryKey: [queriesApproval.GET_APPROVERS, params],
    queryFn: () => getApprovers(params),
  });

export const GetUsers = (params: UserGetParams = {}) =>
  useQuery({
    queryKey: [queriesUsers.GET_USERS, params],
    queryFn: async () => {
      const response = await getUsers(params);

      return response?.data?.map(item => ({
        label: `${item.firstName} (${RoleLabel[item.role]})`,
        value: String(item.id),
      }));
    },
  });

export const GetReviewedSignature = (id: string) =>
  useQuery({
    queryKey: [queriesApproval.GET_REVIEWED_SIGNATURE, id],
    queryFn: () => getReviewedSignature(id),
  });

export const UpdateStatus = (
  options?: UseMutationOptions<unknown, PostError, { id: string; status: RequestStatus }>,
) =>
  useMutation<unknown, PostError, { id: string; status: RequestStatus }>({
    mutationFn: updateStatus,
    ...options,
  });
