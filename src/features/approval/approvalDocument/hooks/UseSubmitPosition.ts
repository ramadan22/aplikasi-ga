import { postSignApproval, updatePositionSignature } from '@/services/approval';
import {
  PostMutationOptionsSignApproval,
  PutMutationOptionsSignature,
} from '@/services/approval/types/Request';
import { post } from '@/services/upload';
import { PostError, PostInput, PostMutationOptions, PostOutput } from '@/services/upload/type';
import { useMutation } from '@tanstack/react-query';

export const handleConvertParams = (data: Record<string, { x: number; y: number }>) => {
  const signatures = Object.entries(data).map(([id, pos]) => ({
    id,
    positionX: pos.x,
    positionY: pos.y,
  }));

  return { signatures };
};

export const SubmitUpdatePosition = (options?: PutMutationOptionsSignature) =>
  useMutation({
    mutationFn: updatePositionSignature,
    ...options,
  });

export const SubmitSignApproval = (options?: PostMutationOptionsSignApproval) =>
  useMutation({
    mutationFn: postSignApproval,
    ...options,
  });

export const PostUpload = (options?: PostMutationOptions) =>
  useMutation<PostOutput, PostError, PostInput>({
    mutationFn: post,
    ...options,
  });
