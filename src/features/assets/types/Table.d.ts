import { RequestStatus } from '@/constants/Approval';

type Action = 'add' | 'delete' | 'edit' | 'detail' | '';

export type TableAction<T = object> = {
  id?: string;
  type: Action;
  process?: RequestStatus;
  data?: T;
};
