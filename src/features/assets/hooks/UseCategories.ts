import { get, queries } from '@/services/category';
import { GetParams } from '@/services/category/types';
import { useQuery } from '@tanstack/react-query';

export const Get = (params: GetParams = {}) =>
  useQuery({
    queryKey: [queries.GET_CATEGORIES, params],
    queryFn: async () => {
      const response = await get({ ...params, keyword: params.keyword });

      return response?.data?.map(item => ({
        label: item.name,
        value: String(item.id),
      }));
    },
    // enabled: !!params.keyword,
  });
