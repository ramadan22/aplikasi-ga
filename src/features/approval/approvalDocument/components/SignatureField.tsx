'use client';

import { Role, RoleLabel } from '@/constants/Role';
import { cn } from '@/lib/classnames';
import { useSidebarStore } from '@/lib/zustand/SidebarStore';
import { useSignatureStore } from '@/lib/zustand/UseSignatureStore';
import { IApprovalSignature } from '@/services/approval/types';
import Tooltip from '@/ui/components/common/Tooltip';
import Button from '@/ui/components/simple/button/Button';
import Input from '@/ui/components/simple/form/input/InputField';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { RefObject, useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { GrPowerReset } from 'react-icons/gr';
import { LiaFileSignatureSolid } from 'react-icons/lia';
import { MdDragIndicator, MdOutlineDriveFolderUpload } from 'react-icons/md';
import SignatureCanvas from 'react-signature-canvas';
import { getDefaultSignaturePosition } from '../utils/getDefaultSignaturePosition';

interface Props {
  sig: IApprovalSignature;
  index: number;
  total: number;
  dragRef: RefObject<HTMLDivElement | null>;
  sigPadRef: RefObject<SignatureCanvas | null>;
  handleRef: RefObject<HTMLDivElement | null>;
  onEnd?: () => void;
  handleReset?: () => void;
  isHideTooltip?: boolean;
  previousSignature?: (sigId: string) => void | null;
  handleUpload?: (value: File, sigId: string) => void;
  loadingUpload?: boolean;
  isErrorUpload?: boolean;
  handleErrorUpload?: (value: boolean) => void;
}

const ButtonList = ({
  handleReset,
  previousSig,
  handleUpload,
  onEnd,
}: {
  handleReset?: () => void;
  previousSig?: () => void;
  handleUpload?: (value: File) => void;
  onEnd?: () => void;
}) => {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleTriggerUpload = () => {
    fileRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && handleUpload) {
      if (handleReset) handleReset();
      handleUpload(file);
    }

    e.target.value = '';
    if (fileRef.current) {
      fileRef.current.value = '';
    }
  };

  return (
    <div className="flex gap-x-2">
      <Tooltip
        sideClassName="w-[110px] px-2 py-1 text-[10px] bg-[#000000] text-[#FFFFFF] rounded-lg"
        content="Upload signature file"
      >
        <Input type="file" ref={fileRef} className="hidden" onChange={handleFileChange} />
        <Button className="p-2" variant="outline" onClick={handleTriggerUpload}>
          <MdOutlineDriveFolderUpload size={15} />
        </Button>
      </Tooltip>
      {previousSig && (
        <Tooltip
          sideClassName="w-[150px] px-2 py-1 text-[10px] bg-[#000000] text-[#FFFFFF] rounded-lg"
          content="Use the previous signature file"
        >
          <Button className="p-2" variant="outline" onClick={() => previousSig()}>
            <LiaFileSignatureSolid size={15} />
          </Button>
        </Tooltip>
      )}
      <Tooltip
        sideClassName="px-2 py-1 text-[10px] bg-[#000000] text-[#FFFFFF] rounded-lg"
        content="Reset"
      >
        <Button
          className="p-2"
          variant="outline"
          onClick={() => {
            if (handleReset) handleReset();
            if (onEnd) onEnd();
          }}
        >
          <GrPowerReset size={15} />
        </Button>
      </Tooltip>
    </div>
  );
};

export const SignatureField = ({
  sig,
  index,
  total,
  dragRef,
  sigPadRef,
  handleRef,
  isHideTooltip,
  onEnd,
  handleReset,
  previousSignature,
  handleUpload,
  loadingUpload,
  isErrorUpload,
  handleErrorUpload,
}: Props) => {
  const { data: loginData } = useSession();
  const { position, setPosition } = useSignatureStore();
  const { isMobileOpen } = useSidebarStore();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (sig.image) setImageUrl(sig.image);
  }, [sig.image]);

  useEffect(() => {
    if (isErrorUpload) {
      setLoading(false);
      if (handleErrorUpload) handleErrorUpload(false);
    }
  }, [isErrorUpload]);

  return (
    <Draggable
      nodeRef={dragRef}
      disabled={loginData?.user.role !== Role.GA}
      handle=".drag-handle"
      defaultPosition={getDefaultSignaturePosition(index, total)}
      position={position[sig.id]}
      onStop={(_, data) => setPosition(sig.id, { x: data.x, y: data.y })}
    >
      <div
        ref={dragRef}
        className={cn('absolute border-b border-[#ccc] bg-[#FFFFFF] w-max rounded-[4px]')}
      >
        <div
          ref={handleRef}
          className={cn(
            'drag-handle relative pt-[6px] text-[12px] text-center',
            loginData?.user.role === Role.GA ? 'cursor-grab' : 'default',
          )}
        >
          {loginData?.user.role === Role.GA && (
            <span className="drag-icon absolute left-0 top-0 mt-2 ml-2">
              <MdDragIndicator />
            </span>
          )}
          <span style={{ fontSize: '15px' }}>{sig.user?.firstName || sig.name || ''}</span>
          <br />
          {`(${RoleLabel[sig.user?.role as Role]})`}
        </div>

        <div style={{ position: 'relative' }}>
          <Tooltip
            open={isMobileOpen || undefined}
            sideClassName={`rounded-md p-2 ${loginData?.user.id !== sig.user?.id ? '!hidden' : ''}`}
            content={
              <ButtonList
                onEnd={onEnd}
                handleReset={() => {
                  if (handleReset) handleReset();
                  setImageUrl('');
                  sigPadRef.current?.clear();
                }}
                handleUpload={value => {
                  if (handleUpload) {
                    setLoading(true);
                    handleUpload(value, sig.id);
                  }
                }}
                previousSig={previousSignature ? () => previousSignature(sig.id) : undefined}
              />
            }
            side="right"
            alwaysClose={isHideTooltip}
          >
            <div style={{ width: 200, height: 106 }}>
              {imageUrl && (
                <div style={{ position: 'relative', width: '100%', height: '106px' }}>
                  <Image
                    src={imageUrl}
                    alt="signature"
                    fill // membuat image mengisi parent
                    style={{ objectFit: 'cover' }} // background cover
                    onLoad={() => setLoading(false)}
                  />
                </div>
              )}
              {!imageUrl && (
                <SignatureCanvas
                  ref={sigPadRef}
                  penColor="black"
                  canvasProps={{ width: 200, height: 100 }}
                  onEnd={() => {
                    if (onEnd) onEnd();
                  }}
                />
              )}
            </div>

            {/* Disable Interaction */}
            {loginData?.user.id !== sig.user?.id && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 10,
                }}
              />
            )}

            {loginData?.user.id === sig.user?.id && (loadingUpload || loading) && (
              <div className="absolute inset-0 z-[11] flex justify-center items-center">
                <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
              </div>
            )}
          </Tooltip>
        </div>
      </div>
    </Draggable>
  );
};
