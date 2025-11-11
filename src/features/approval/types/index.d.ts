import { Data, IApprovalDetail } from '@/services/approval/types';
import { PaginationParams } from '@/types/ResponseApi';

export type Props = {
  params: PaginationParams;
};

/**
 * ✅ Grouped Assets (Frontend only)
 * — Dibuat dari hasil pengelompokan array assets backend
 */
export type GroupedAsset = {
  name: string;
  count: number;
  isMaintenance: boolean;
  categoryId: string;
  category: {
    id: string;
    name: string;
    prefix: string;
  } | null;
};

export type DataApproval = Data;

export type ApprovalDetail = IApprovalDetail;
