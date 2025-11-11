import { RequestStatus } from '@/constants/Approval';
import { Data } from '@/services/approval/types';

type Action = 'delete' | 'edit' | 'detail' | '';

export type ActionTable = {
  id: string | number | null;
  action: Action;
  process?: RequestStatus | '';
  data?: Data;
};
