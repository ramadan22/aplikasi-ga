import { MutationConfig } from '@/types/Mutation';
import { PaginationParams, ResponseApiTypes } from '@/types/ResponseApi';
import { ICategory } from '.';

export type GetParams = {} & PaginationParams;
export type GetResponse = ResponseApiTypes<ICategory[]>;

export type GetByIdResponse = ResponseApiTypes<ICategory[]>;

interface IPostParams {
  name: string;
  prefix: string;
  isDevice: boolean;
}

export type PostMutationOptions = MutationConfig<ICategory, IPostParams>;
export type IPostResponse = ResponseApiTypes<ICategory>;

interface IPutParams {
  id?: string;
  name: string;
  prefix: string;
  isDevice: boolean;
}

export type PutMutationOptions = MutationConfig<ICategory, IPutParams>;
export type IPutResponse = ResponseApiTypes<ICategory>;

export type DeleteMutationOptions = MutationConfig<ICategory, string>;
export type IDeleteResponse = ResponseApiTypes<ICategory>;
