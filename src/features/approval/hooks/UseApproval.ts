import { RequestStatus } from '@/constants/Approval';
import { Role, RoleLabel } from '@/constants/Role';
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
  ApprovalPostMutationOptions,
  ApprovalPutMutationOptions,
  GetParamsApproval,
  GetParamsApprovers,
} from '@/services/approval/types/Request';
import { get as getUsers, queries as queriesUsers } from '@/services/users';
import { GetParams as UserGetParams } from '@/services/users/types/Request';
import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const Get = (params: GetParamsApproval) =>
  useQuery({
    queryKey: [queriesApproval.GET_APPROVALS, params],
    queryFn: () => getApi(params),
    refetchOnWindowFocus: 'always',
    refetchOnReconnect: 'always',
    refetchIntervalInBackground: true,
  });

export const Post = (options?: ApprovalPostMutationOptions) =>
  useMutation({
    mutationFn: post,
    ...options,
  });

export const Update = (options?: ApprovalPutMutationOptions) =>
  useMutation({
    mutationFn: update,
    ...options,
  });

export const GetApprovers = (params: GetParamsApprovers) =>
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
        label: `${item.firstName} (${RoleLabel[item.role as Role]})`,
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
  options?: UseMutationOptions<unknown, AxiosError, { id: string; status: RequestStatus }>,
) =>
  useMutation<unknown, AxiosError, { id: string; status: RequestStatus }>({
    mutationFn: updateStatus,
    ...options,
  });
