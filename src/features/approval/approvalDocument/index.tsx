'use client';

import { RequestStatus } from '@/constants/Approval';
import { Role } from '@/constants/Role';
import { messageError, messageSuccess } from '@/lib/react-toastify';
import { useSignatureStore } from '@/lib/zustand/UseSignatureStore';
import { IApprovalSignature } from '@/services/approval/types';
import ButtonWithSpinner from '@/ui/components/simple/button/ButtonWithSpinner';
import { ErrorConvertToMessage } from '@/utils';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { DocumentContent } from './components/DocumentContent';
import { SignatureField } from './components/SignatureField';
import { GetDetailApproval, GetPreviousSignature } from './hooks/UseApproval';
import { useExportPdf } from './hooks/UseExportPdf';
import { useSignatureRefs } from './hooks/UseSignatureRef';
import {
  PostUpload,
  SubmitSignApproval,
  SubmitUpdatePosition,
  handleConvertParams,
} from './hooks/UseSubmitPosition';

const ApprovalDocument = () => {
  const { data: loginData } = useSession();
  const searchParams = useSearchParams();
  const docRef = useRef<HTMLDivElement>(null);
  const [idApprovalSignature, setIdApprovalSignature] = useState('');
  const [approvalId, setApprovalId] = useState('');
  const [signatures, setSignatures] = useState<IApprovalSignature[]>([]);
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [isSign, setIsSign] = useState(false);
  const [isErrorUpload, setIsErrorUpload] = useState(false);
  const { resetPosition, initializePosition, position } = useSignatureStore();
  const { exportToPdf } = useExportPdf();
  const id = searchParams.get('id');

  const { data: approval, refetch } = GetDetailApproval(id || '');
  const { data: previousSignature } = GetPreviousSignature(id || '');

  // const signatures = approval?.data?.signatures;
  const findData = signatures?.find(item => item.user?.id === loginData?.user.id);
  const { dragRefs, sigPadRefs, handleRefs } = useSignatureRefs(signatures);

  const { mutate: handleUpdatePosition, isPending } = SubmitUpdatePosition({
    onSuccess: res => {
      messageSuccess(res.message);
      refetch();
    },
    onError: err => {
      messageError(err.message);
    },
  });

  const { mutate: handleSignApproval, isPending: pendingSignApproval } = SubmitSignApproval({
    onMutate: () => {
      setApprovalId('');
      setIdApprovalSignature('');
    },
    onSuccess: res => {
      messageSuccess(res.message);
    },
    onError: err => {
      messageError(err.message);
    },
  });

  const { mutate: submitUpload, isPending: loadingSubmitUpload } = PostUpload({
    onSuccess: res => {
      handleSignApproval({ id: idApprovalSignature, approvalId, image: res.data?.url || '' });
    },
    onError: err => {
      messageError(ErrorConvertToMessage(err));
      setIsErrorUpload(true);
    },
  });

  const dataURLtoFile = (dataURL: string, filename: string) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const handleSubmit = () => {
    if (findData?.id) {
      setApprovalId(id || '');
      setIdApprovalSignature(findData?.id);

      const png = sigPadRefs[findData.id].current?.toDataURL('image/png');
      if (sigPadRefs[findData.id].current?.isEmpty() || !png) return;

      const file = dataURLtoFile(png, 'signature.png');

      submitUpload({ type: 'image', usage: 'signatures', file });
    }
  };

  const checkSignature = () => {
    if (!findData) return setEnableSubmit(false);

    const pad = sigPadRefs[findData.id]?.current;
    if (!pad) return setEnableSubmit(false); // belum siap → false

    setEnableSubmit(!pad.isEmpty()); // true kalau ada tanda tangan
  };

  const handleUsePreviousSig = (sigId: string) => {
    setSignatures(prev => {
      return prev.map(item => {
        if (item.id === sigId)
          return {
            ...item,
            image: previousSignature?.data?.image || '',
          };

        return item;
      });
    });
  };

  useEffect(() => {
    if (approval?.data?.signatures) setSignatures(approval?.data?.signatures);
  }, [approval?.data?.signatures]);

  useEffect(() => {
    if (signatures?.length) {
      setIsSign(
        !!signatures.find(item => item.image !== null && item.user?.id === loginData?.user.id),
      );

      initializePosition(
        signatures.map(sig => ({
          id: sig.id,
          positionX: sig.positionX,
          positionY: sig.positionY,
        })),
      );
    }
  }, [signatures, initializePosition]);

  return (
    <div className="p-4">
      <div
        ref={docRef}
        style={{
          width: '210mm',
          height: '297mm',
          padding: '20mm',
          background: 'white',
          position: 'relative',
        }}
      >
        <DocumentContent data={approval?.data} />

        {signatures?.map((sig, idx) => (
          <SignatureField
            key={sig.id}
            sig={sig}
            index={idx}
            total={signatures.length}
            dragRef={dragRefs[sig.id]}
            sigPadRef={sigPadRefs[sig.id]}
            handleRef={handleRefs[sig.id]}
            loadingUpload={loadingSubmitUpload || pendingSignApproval}
            onEnd={checkSignature}
            handleReset={() => setIsSign(false)}
            isErrorUpload={isErrorUpload}
            handleErrorUpload={setIsErrorUpload}
            handleUpload={(file, sigId) => {
              setApprovalId(id || '');
              setIdApprovalSignature(sigId);
              submitUpload({ type: 'image', usage: 'signatures', file });
            }}
            previousSignature={
              previousSignature?.data ? sigId => handleUsePreviousSig(sigId) : undefined
            }
            isHideTooltip={
              approval?.data?.status === RequestStatus.DONE ||
              approval?.data?.status === RequestStatus.REJECT
            }
          />
        ))}
      </div>
      <div className="flex gap-2 mt-4 mb-10 justify-end">
        {loginData?.user.role === Role.GA && (
          <>
            {/* Export PDF = Primary Action */}
            <button
              onClick={() =>
                signatures &&
                docRef.current &&
                exportToPdf(docRef.current, {
                  signatures,
                  dragRefs,
                  handleRefs,
                  sigPadRefs,
                })
              }
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow"
            >
              Export PDF
            </button>

            {/* Reset Position = Warning */}
            {approval?.data?.status === 'DRAFT' && (
              <button
                onClick={resetPosition}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded shadow"
              >
                Reset Position
              </button>
            )}
          </>
        )}

        {loginData?.user.role === Role.GA && (
          <ButtonWithSpinner
            isLoading={isPending}
            disabled={isPending}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded shadow"
            onClick={() => {
              const payload = handleConvertParams(position);
              handleUpdatePosition({ id: approval?.data?.id, ...payload });
            }}
          >
            Update Position
          </ButtonWithSpinner>
        )}

        {!!signatures?.find(
          item =>
            approval?.data?.status !== RequestStatus.DONE &&
            approval?.data?.status !== RequestStatus.REJECT &&
            item.user?.id === loginData?.user.id &&
            !isSign,
        ) && (
          <ButtonWithSpinner
            isLoading={loadingSubmitUpload || pendingSignApproval}
            disabled={!enableSubmit || loadingSubmitUpload || pendingSignApproval}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded shadow"
            onClick={handleSubmit}
          >
            Submit Signature
          </ButtonWithSpinner>
        )}
      </div>
    </div>
  );
};

export default ApprovalDocument;
