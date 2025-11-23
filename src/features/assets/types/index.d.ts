import { IAssetByName } from '@/services/asset/types';
import { PaginationParams } from '@/types/ResponseApi';

export type Props = {
  params: PaginationParams;
};

export type DataAssetsByName = IAssetByName;
