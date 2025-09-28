import { changePassword } from '@/services/authentication';
import { useMutation } from '@tanstack/react-query';
import { PostError, PostInput, PostMutationOptions, PostOutput } from '../types';

export const Post = (options?: PostMutationOptions) =>
  useMutation<PostOutput, PostError, PostInput>({
    mutationFn: changePassword,
    ...options,
  });
