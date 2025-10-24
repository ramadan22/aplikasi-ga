import { ResponseApiTypes } from '@/types/ResponseApi';
import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export type ID = string;

export type Field = {
  type: string;
  usage: string;
  file: File | null;
};

export type Data = {
  id: string;
  filename: string;
  mimeType: string;
  extension: string;
  size: number;
  url: string;
  storageKey: string;
  category: string;
  uploaderId: string | null;
  createdAt: string;
  updatedAt: string;
};

// export type GetParams = { name?: string } & PaginationParams;
// export type GetResponse = ResponseApiTypes<Data[]>;
// export type GetResponseAssetsByName = ResponseApiTypes<DataAssetsByName[]>;
// export type GetByIdResponse = ResponseApiTypes<Data>;
export type PostParams = {} & Field;
export type PostResponse = ResponseApiTypes<Data>;

export type PostInput = PostParams;
export type PostOutput = PostResponse;
export type PostError = AxiosError;

export type PostMutationOptions = UseMutationOptions<PostOutput, PostError, PostInput>;
// export type UpdateMutationOptions = UseMutationOptions<PostOutput, PostError, PostInput>;
// export type DeleteMutationOptions = UseMutationOptions<PostOutput, PostError, ID>;
