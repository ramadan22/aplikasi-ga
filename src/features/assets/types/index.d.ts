import { DataAssetsByName, Field } from '@/services/asset/types';
import { PaginationParams } from '@/types/ResponseApi';

export type Props = {
  params: PaginationParams;
};

export type Option = {
  label: string;
  value: string;
};

export type FormParams = {
  category?: Option | null;
} & Field;

export type ActionTable = {
  id: string | number | null;
  action: 'delete' | 'edit' | 'detail' | '';
  data?: DataAssetsByName;
};

export type DataAssetsByName = DataAssetsByName;

export type FormProps = {
  id: string;
  data: DataAssetsByName | undefined;
  handleSuccess: (value: boolean) => void;
  handleModal: (value: boolean) => void;
};
