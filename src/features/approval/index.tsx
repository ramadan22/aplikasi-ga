'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { RequestStatus } from '@/constants/Approval';
import { defaultParams } from '@/data/Table';
import { messageError, messageSuccess } from '@/lib/react-toastify';
import DeleteConfirmModal from '@/ui/components/common/ModalConfirm';
import TableDataUI from '@/ui/components/common/TableData';
import { Modal } from '@/ui/components/simple/modal';
import { useModal } from '@/utils/UseModal';
import { handlePaginationChange } from '@/utils/UseTable';
import Detail from './Detail';
import Form from './Form';
import { Get, UpdateStatus } from './hooks/UseApproval';
import UseStable from './hooks/UseTable';
import { DataApproval, Props } from './types';

const ApprovalFeature = ({ params }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { tableHeaders, action, setAction } = UseStable();
  const { isOpen, openModal, closeModal } = useModal();

  const { data: approvals, isLoading, refetch } = Get({ ...params });

  const { mutate: handleReject, isPending: isPendingReject } = UpdateStatus({
    onSuccess: () => {
      messageSuccess('Success reject approval');
      modalClosed();
    },
    onError: err => {
      const message = (err as { message: string }).message;
      messageError(message);
    },
  });

  const modalClosed = () => {
    closeModal();
    setAction({ id: '', action: '' });
  };

  return (
    <>
      <TableDataUI
        isButtonDetail
        isButtonEdit={false}
        isButtonDelete={false}
        headers={tableHeaders}
        data={approvals?.data}
        isLoading={isLoading}
        handleChangeParams={(key, value) => {
          handlePaginationChange({
            key,
            value,
            searchParams,
            pathname,
            router,
          });
        }}
        handleButtonAction={(value, id, data) => {
          if (value === 'add') openModal();
          if (value === 'edit' || value === 'detail')
            setAction({ id, action: value, data: data as DataApproval });
        }}
        meta={{
          // sorter: assets?.meta?.sorter || '',
          size: Number(searchParams.get('limit')) || defaultParams.size,
          page: Number(searchParams.get('page')) || defaultParams.page,
          total: approvals?.meta?.total || 0,
        }}
      />
      <Modal
        isOpen={isOpen || action.action === 'edit'}
        onClose={() => modalClosed()}
        className="max-w-[700px] p-6 lg:p-10"
        size="md"
      >
        <Form
          id={action.id as string}
          data={action.data}
          process={action.process}
          handleSuccess={value => {
            if (value) {
              refetch();
              modalClosed();
            }
          }}
          handleModal={value => {
            if (value) openModal();
            if (!value) modalClosed();
          }}
        />
      </Modal>
      <Modal
        isOpen={action.action === 'detail'}
        onClose={() => modalClosed()}
        className="max-w-[700px] p-6 lg:p-10"
        size="lg"
      >
        <Detail
          data={action.data || null}
          handleReject={id => setAction({ id, action: 'delete' })}
          handleProcess={data => {
            const condition =
              data.submissionType === 'PROCUREMENT' &&
              data.assets.length < 1 &&
              data.signatures.length < 1;

            if (condition) {
              setAction({
                id: data.id,
                action: 'edit',
                process: data.status as RequestStatus,
                data: data as DataApproval,
              });
            }
          }}
        />
      </Modal>
      <DeleteConfirmModal
        isOpen={action.action === 'delete'}
        onClose={() => modalClosed()}
        onConfirm={() => handleReject({ id: `${action.id}`, status: RequestStatus.REJECT })}
        isLoading={isPendingReject}
        title="Reject this approval?"
        description="This action will mark the request as rejected and may require a new resubmission. This cannot be undone."
      />
    </>
  );
};

export default ApprovalFeature;
