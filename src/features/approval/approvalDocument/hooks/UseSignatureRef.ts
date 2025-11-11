import { IApprovalSignature } from '@/services/approval/types';
import React, { RefObject, useMemo } from 'react';
import SignatureCanvas from 'react-signature-canvas';

type DragHandleRefs = Record<string, RefObject<HTMLDivElement | null>>;
type SigPadRefs = Record<string, RefObject<SignatureCanvas | null>>;

export const useSignatureRefs = (signatures: IApprovalSignature[] | undefined) => {
  const dragRefs: DragHandleRefs = useMemo(() => {
    const sigs = signatures ?? [];
    return sigs.reduce((acc: DragHandleRefs, sig) => {
      acc[sig.id] = React.createRef<HTMLDivElement | null>();
      return acc;
    }, {});
  }, [signatures]);

  const handleRefs: DragHandleRefs = useMemo(() => {
    const sigs = signatures ?? [];
    return sigs.reduce((acc: DragHandleRefs, sig) => {
      acc[sig.id] = React.createRef<HTMLDivElement | null>();
      return acc;
    }, {});
  }, [signatures]);

  const sigPadRefs: SigPadRefs = useMemo(() => {
    const sigs = signatures ?? [];
    return sigs.reduce((acc: SigPadRefs, sig) => {
      acc[sig.id] = React.createRef<SignatureCanvas | null>();
      return acc;
    }, {});
  }, [signatures]);

  return {
    dragRefs,
    sigPadRefs,
    handleRefs,
  };
};
