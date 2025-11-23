import { changePassword } from '@/services/authentication';
import { PostMutationChangePassword } from '@/services/authentication/types/Request';
import { useMutation } from '@tanstack/react-query';

export const Post = (options?: PostMutationChangePassword) =>
  useMutation({
    mutationFn: changePassword,
    ...options,
  });
