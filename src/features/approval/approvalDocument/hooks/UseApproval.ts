import { detail, queries as queriesApproval } from '@/services/approval';
import { useQuery } from '@tanstack/react-query';

export const GetDetailApproval = (id: string) =>
  useQuery({
    queryKey: [queriesApproval.GET_APPROVALS, { id }],
    queryFn: () => detail(id),
    enabled: !!id,
  });
