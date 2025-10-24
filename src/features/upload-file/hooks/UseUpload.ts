import { post } from '@/services/upload';
import { PostError, PostInput, PostMutationOptions, PostOutput } from '@/services/upload/type';
import { useMutation } from '@tanstack/react-query';

export const Post = (options?: PostMutationOptions) =>
  useMutation<PostOutput, PostError, PostInput>({
    mutationFn: post,
    ...options,
  });
