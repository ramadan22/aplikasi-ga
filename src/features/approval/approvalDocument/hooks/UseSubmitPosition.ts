import { updatePositionSignature } from '@/services/approval';
import { PutMutationOptionsSignature } from '@/services/approval/types/Request';
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
