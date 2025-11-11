import { updatePositionSignature } from '@/services/approval';
import {
  PostError,
  UpdateInputSignature,
  UpdateOutputSignature,
  UpdateSignaturePositionOptions,
} from '@/services/approval/types';
import { useMutation } from '@tanstack/react-query';

export const handleConvertParams = (data: Record<string, { x: number; y: number }>) => {
  const signatures = Object.entries(data).map(([id, pos]) => ({
    id,
    positionX: pos.x,
    positionY: pos.y,
  }));

  return { signatures };
};

export const SubmitUpdatePosition = (options?: UpdateSignaturePositionOptions) =>
  useMutation<UpdateOutputSignature, PostError, UpdateInputSignature>({
    mutationFn: updatePositionSignature,
    ...options,
  });
