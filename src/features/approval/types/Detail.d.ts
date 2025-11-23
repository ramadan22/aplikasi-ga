import { DataApproval } from '../types';

export interface PropsDetail {
  handleProcess: (data: DataApproval, isEdit?: boolean) => void;
  handleReject: (id: string) => void;
  data: DataApproval | undefined;
}

/**
 * Grouped Assets (Frontend only)
 * Created from the result of grouping the backend assets array
 */
export type GroupedAsset = {
  name: string;
  count: number;
  isMaintenance: boolean;
  category: {
    id: string;
    name: string;
    prefix: string;
  } | null;
};
