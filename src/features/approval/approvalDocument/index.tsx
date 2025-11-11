'use client';

import { Role } from '@/constants/Role';
import { messageError, messageSuccess } from '@/lib/react-toastify';
import { useSignatureStore } from '@/lib/zustand/UseSignatureStore';
import ButtonWithSpinner from '@/ui/components/simple/button/ButtonWithSpinner';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { DocumentContent } from './components/DocumentContent';
import { SignatureField } from './components/SignatureField';
import { GetDetailApproval } from './hooks/UseApproval';
import { useExportPdf } from './hooks/UseExportPdf';
import { useSignatureRefs } from './hooks/UseSignatureRef';
import { SubmitUpdatePosition, handleConvertParams } from './hooks/UseSubmitPosition';

const ApprovalDocument = () => {
  const { data: loginData } = useSession();
  const searchParams = useSearchParams();
  const docRef = useRef<HTMLDivElement>(null);
  const { resetPosition, initializePosition, position } = useSignatureStore();
  const { exportToPdf } = useExportPdf();

  const id = searchParams.get('id');

  const { data: approval, refetch } = GetDetailApproval(id || '');

  const signatures = approval?.data?.signatures;
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

  useEffect(() => {
    if (signatures?.length) {
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
      </div>
    </div>
  );
};

export default ApprovalDocument;
