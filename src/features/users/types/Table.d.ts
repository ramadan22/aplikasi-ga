import { RequestStatus } from '@/constants/Approval';

type Action =
  | 'add'
  | 'delete'
  | 'edit'
  | 'detail'
  | 'detail_user'
  | 'detail_new_user'
  | 'reset_password'
  | '';

export type TableAction<T = object> = {
  id?: string;
  type: Action;
  process?: RequestStatus;
  data?: T;
};
