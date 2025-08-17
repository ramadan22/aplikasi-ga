import { Data } from '@/services/category/types';
import { PaginationParams } from '@/types/ResponseApi';

export type Props = {
  params: PaginationParams;
};

export type FormParams = {} & Data;

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
