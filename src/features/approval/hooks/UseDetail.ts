import { IApproval } from '@/services/approval/types';
import { GroupedAsset } from '../types/Detail';

const UseDetail = (data: IApproval) => {
  const createdByName = `${data.createdBy.firstName} ${data.createdBy.lastName || ''}`.trim();

  const groupedAssets: GroupedAsset[] = Object.values(
    data.assets?.reduce<Record<string, GroupedAsset>>((acc, item) => {
      const key = item.name;

      if (!acc[key]) {
        acc[key] = {
          name: item.name,
          count: 0,
          isMaintenance: item.isMaintenance,
          category: item.category,
        };
      }

      acc[key].count += 1;

      return acc;
    }, {}) ?? {},
  );

  const isEdit =
    data.submissionType === 'PROCUREMENT' && data.assets.length < 1 && data.signatures.length < 1;

  return {
    groupedAssets,
    createdByName,
    isEdit,
  };
};

export default UseDetail;
