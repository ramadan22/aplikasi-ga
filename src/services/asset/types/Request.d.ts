import { MutationConfig } from '@/types/Mutation';
import { PaginationParams } from '@/types/ResponseApi';
import { IAsset, IAssetByName } from '.';

export type GetParams = { name?: string } & PaginationParams;
export type GetResponse = ResponseApiTypes<IAsset[]>;

interface IPostParams {
  id?: string;
  name: string;
  categoryId: string;
  image: string;
  isMaintenance: boolean;
  serialNumber: string;
}

export type PostMutationOptions = MutationConfig<IAsset, IPostParams>;
export type PostResponse = ResponseApiTypes<IAsset>;

interface IPutParams {
  id?: string;
  name: string;
  categoryId: string;
  image: string;
  isMaintenance: boolean;
  serialNumber: string;
}

export type PutMutationOptions = MutationConfig<IAsset, IPutParams>;
export type PutResponse = ResponseApiTypes<IAsset>;

export type GetResponseAssetsByName = ResponseApiTypes<IAssetByName[]>;

export type GetResponseById = ResponseApiTypes<IAsset>;

export type GetResponseById = ResponseApiTypes<IAsset>;

export type DeleteMutationOptions = MutationConfig<IAsset, string>;
