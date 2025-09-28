import { getProfile, queries } from '@/services/users';
import { useQuery } from '@tanstack/react-query';

export const Get = () =>
  useQuery({
    queryKey: [queries.GET_PROFILE],
    queryFn: () => getProfile(),
    refetchInterval: false,
  });
