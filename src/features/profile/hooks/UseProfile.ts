import { getProfile, queries, update } from '@/services/users';
import { PutMutationOptions } from '@/services/users/types/Request';
import { useMutation, useQuery } from '@tanstack/react-query';

interface Props {
  id?: string;
}

export const Get = ({ id }: Props) =>
  useQuery({
    queryKey: [queries.GET_PROFILE, id],
    queryFn: () => getProfile(undefined, id),
  });

export const UpdateProfile = (options?: PutMutationOptions) =>
  useMutation({
    mutationFn: update,
    ...options,
  });
