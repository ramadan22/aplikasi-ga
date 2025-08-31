import { PaginationParams, ResponseApiTypes } from '@/types/ResponseApi';
import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export type ID = string;

export type Field = {
  id?: string;
  name: string;
  categoryId: string;
};

export type Data = {
  id: string;
  name: string;
  quantity: number;
  category: {
    id: string;
    name: string;
  } | null;
};

export interface Category {
  id: string;
  name: string;
  prefix: string;
  is_deleted: boolean;
  is_device: boolean;
  createdAt: string;
}

export type DataAssetsByName = {
  id: string;
  name: string;
  code: string;
  isMaintenance: boolean;
  categoryId: string;
  is_deleted: boolean;
  serial_number: string | null;
  createdAt: string;
  category: Category;
};

export type GetParams = { name?: string } & PaginationParams;
export type GetResponse = ResponseApiTypes<Data[]>;
export type GetResponseAssetsByName = ResponseApiTypes<DataAssetsByName[]>;
export type GetByIdResponse = ResponseApiTypes<Data>;
export type PostParams = { id?: string } & Field;
export type PostResponse = ResponseApiTypes<Data>;

export type PostInput = PostParams;
export type PostOutput = PostResponse;
export type PostError = AxiosError;

export type PostMutationOptions = UseMutationOptions<PostOutput, PostError, PostInput>;
export type UpdateMutationOptions = UseMutationOptions<PostOutput, PostError, PostInput>;
export type DeleteMutationOptions = UseMutationOptions<PostOutput, PostError, ID>;
