import { PaginationParams, ResponseApiTypes } from '@/types/ResponseApi';
import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export type ID = string;

export type Field = {
  id?: string;
  name: string;
  categoryId: string;
  image: string;
  isMaintenance: boolean;
  serialNumber: string;
};

export interface Category {
  id: string;
  name: string;
  prefix: string;
  isDevice: boolean;
}

export type Data = {
  id: string;
  name: string;
  code: string;
  isMaintenance: boolean;
  serialNumber: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  category: Category;
  quantity: number;
};

export type DataAssetsByName = {
  id: string;
  name: string;
  code: string;
  isMaintenance: boolean;
  serialNumber: string;
  image: string | null;
  createdAt: string;
  updatedAt: string | null;
  category: {
    id: string;
    name: string;
    prefix: string;
    isDevice: boolean;
  };
};

export type GetParams = { name?: string } & PaginationParams;
export type GetResponse = ResponseApiTypes<Data[]>;
export type GetResponseAssetsByName = ResponseApiTypes<DataAssetsByName[]>;
export type GetByIdResponse = ResponseApiTypes<Data>;
export type PostParams = Field;
export type PostResponse = ResponseApiTypes<Data>;

export type PostInput = PostParams;
export type PostOutput = PostResponse;
export type PostError = AxiosError;

export type PostMutationOptions = UseMutationOptions<PostOutput, PostError, PostInput>;
export type UpdateMutationOptions = UseMutationOptions<PostOutput, PostError, PostInput>;
export type DeleteMutationOptions = UseMutationOptions<PostOutput, PostError, ID>;
