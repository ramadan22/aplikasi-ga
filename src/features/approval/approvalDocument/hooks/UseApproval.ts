import { detail, getPreviousSignature, queries as queriesApproval } from '@/services/approval';
import { useQuery } from '@tanstack/react-query';

export const GetDetailApproval = (id: string) =>
  useQuery({
    queryKey: [queriesApproval.GET_APPROVALS, { id }],
    queryFn: () => detail(id),
    enabled: !!id,
  });

export const GetPreviousSignature = (id: string) =>
  useQuery({
    queryKey: [queriesApproval.GET_PREVIOUS_SIGNATURE, { id }],
    queryFn: () => getPreviousSignature(),
    enabled: !!id,
  });
