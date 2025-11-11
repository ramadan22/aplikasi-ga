'use client';

import { Role } from '@/constants/Role';
import { cn } from '@/lib/classnames';
import { useSignatureStore } from '@/lib/zustand/UseSignatureStore';
import { IApprovalSignature } from '@/services/approval/types';
import { useSession } from 'next-auth/react';
import { RefObject } from 'react';
import Draggable from 'react-draggable';
import { MdDragIndicator } from 'react-icons/md';
import SignatureCanvas from 'react-signature-canvas';
import { getDefaultSignaturePosition } from '../utils/getDefaultSignaturePosition';

interface Props {
  sig: IApprovalSignature;
  index: number;
  total: number;
  dragRef: RefObject<HTMLDivElement | null>;
  sigPadRef: RefObject<SignatureCanvas | null>;
  handleRef: RefObject<HTMLDivElement | null>;
}

export const SignatureField = ({ sig, index, total, dragRef, sigPadRef, handleRef }: Props) => {
  const { data: loginData } = useSession();
  const { position, setPosition } = useSignatureStore();

  return (
    <Draggable
      nodeRef={dragRef}
      disabled={loginData?.user.role !== Role.GA}
      handle=".drag-handle"
      defaultPosition={getDefaultSignaturePosition(index, total)}
      position={position[sig.id]}
      onStop={(_, data) => setPosition(sig.id, { x: data.x, y: data.y })}
    >
      <div ref={dragRef} className="absolute border border-[#ccc] bg-[#FFFFFF] w-max rounded-[4px]">
        <div
          ref={handleRef}
          className={cn(
            'drag-handle relative pt-[6px] text-[12px] text-center',
            loginData?.user.role === Role.GA ? 'cursor-grab' : 'default',
          )}
        >
          <span className="drag-icon absolute left-0 top-0 mt-2 ml-2">
            <MdDragIndicator />
          </span>
          {sig.user?.firstName || sig.name || ''}
        </div>

        <div style={{ position: 'relative' }}>
          <SignatureCanvas
            ref={sigPadRef}
            penColor="black"
            canvasProps={{ width: 200, height: 100 }}
          />

          {/* Disable Interaction */}
          {loginData?.user.id !== sig.id && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 10,
              }}
            />
          )}
        </div>
      </div>
    </Draggable>
  );
};
