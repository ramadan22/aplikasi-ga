import { Data } from '@/services/asset/types';
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
} & Data;

export type ActionTable = {
  id: string | number | null;
  action: 'delete' | 'edit' | '';
  data?: FormParams;
};

export type FormProps = {
  id: string;
  data: FormParams | undefined;
  handleSuccess: (value: boolean) => void;
  handleModal: (value: boolean) => void;
};
