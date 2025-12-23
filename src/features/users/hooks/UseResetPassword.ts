import { resetPassword } from '@/services/authentication';
import { PostMutationResetPassword } from '@/services/authentication/types/Request';
import { useMutation } from '@tanstack/react-query';

export const PostResetPassword = (options?: PostMutationResetPassword) =>
  useMutation({
    mutationFn: resetPassword,
    ...options,
  });
