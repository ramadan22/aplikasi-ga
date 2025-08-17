import { PaginationParams, ResponseApiTypes } from '@/types/ResponseApi';
import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export type ID = string;

export type Field = {
  id?: ID;
  name: string;
  prefix: string;
};

export type Data = {
  createdAt: string;
} & Field;

export type GetParams = {} & PaginationParams;
export type GetResponse = ResponseApiTypes<Data[]>;
export type GetByIdResponse = ResponseApiTypes<Data>;
export type PostParams = Field;
export type PostResponse = ResponseApiTypes<Data>;

export type PostInput = PostParams;
export type PostOutput = PostResponse;
export type PostError = AxiosError;

export type PostMutationOptions = UseMutationOptions<PostOutput, PostError, PostInput>;
export type UpdateMutationOptions = UseMutationOptions<PostOutput, PostError, PostInput>;
export type DeleteMutationOptions = UseMutationOptions<PostOutput, PostError, ID>;
