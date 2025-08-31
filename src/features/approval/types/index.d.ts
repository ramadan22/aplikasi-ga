import { PaginationParams } from '@/types/ResponseApi';

export type Props = {
  params: PaginationParams;
};

export type Option = {
  label: string;
  value: string;
};

export type FormParams = {
  submissionType: string;
  approved_by: Option[];
  note: string;
  asset_request: {
    idx: string;
    sn: string;
    name: string;
    category_id: string;
  }[];
};

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
