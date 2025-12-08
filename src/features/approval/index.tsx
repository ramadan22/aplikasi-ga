'use client';

import { RequestStatus } from '@/constants/Approval';
import { defaultParams } from '@/data/Table';
import { messageError, messageSuccess } from '@/lib/react-toastify';
import DeleteConfirmModal from '@/ui/components/common/ModalConfirm';
import TableDataUI from '@/ui/components/common/TableData';
import { Modal } from '@/ui/components/simple/modal';
import { useModal } from '@/utils/UseModal';
import UsePagination from '@/utils/UsePagination';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import Detail from './Detail';
import Form from './Form';
import { Get, UpdateStatus } from './hooks/UseApproval';
import UseStable from './hooks/UseTable';
import { DataApproval, Props } from './types';

const ApprovalFeature = ({ params }: Props) => {
  const searchParams = useSearchParams();
  const { handlePaginationChange } = UsePagination();
  const { tableHeaders, setAction, action } = UseStable();
  const { openModal, closeModal } = useModal();

  const { data: approvals, isLoading, refetch, isRefetching } = Get(params);

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
    setAction({ id: '', type: '' });
  };

  useEffect(() => {
    if (action.type === 'detail') {
      const find = approvals?.data?.find(item => item.id === action.id);
      if (find?.status !== action.data?.status)
        setAction({ id: find?.id, type: 'detail', data: find });
    }
  }, [isRefetching]);

  return (
    <>
      <TableDataUI<DataApproval>
        isButtonDetail
        isButtonEdit={false}
        isButtonDelete={false}
        headers={tableHeaders}
        data={approvals?.data}
        isLoading={isLoading}
        handleChangeParams={(key, value) => handlePaginationChange({ key, value })}
        handleButtonAction={(value, id = '', data) => {
          if (value === 'add') setAction({ type: 'add' });
          if (value === 'edit' || value === 'detail') {
            setAction({ id, type: value, data });
          }
        }}
        meta={{
          // sorter: assets?.meta?.sorter || '',
          size: Number(searchParams.get('limit')) || defaultParams.size,
          page: Number(searchParams.get('page')) || defaultParams.page,
          total: approvals?.meta?.total || 0,
        }}
      />
      <Modal
        isOpen={action.type === 'add' || action.type === 'edit'}
        onClose={() => modalClosed()}
        className="max-w-[700px] p-6 lg:p-10"
        size="md"
      >
        <Form
          id={action.id as string}
          data={action.data}
          process={action.process}
          handleSuccess={success => {
            if (!success) return;
            refetch();
            modalClosed();
          }}
          handleModal={value => {
            if (value) openModal();
            if (!value) modalClosed();
          }}
        />
      </Modal>
      <Modal
        isOpen={action.type === 'detail'}
        onClose={() => modalClosed()}
        className="max-w-[700px] p-6 lg:p-10"
        size="lg"
      >
        <Detail
          data={action.data}
          handleReject={id => setAction({ id, type: 'delete' })}
          handleProcess={(data, isEdit) => {
            if (!isEdit) return;

            setAction({
              id: data.id,
              type: 'edit',
              process: data.status,
              data: data,
            });
          }}
        />
      </Modal>
      <DeleteConfirmModal
        isOpen={action.type === 'delete'}
        onClose={() => modalClosed()}
        onConfirm={() => handleReject({ id: action?.id || '', status: RequestStatus.REJECT })}
        isLoading={isPendingReject}
        title="Reject this approval?"
        description="This action will mark the request as rejected and may require a new resubmission. This cannot be undone."
      />
    </>
  );
};

export default ApprovalFeature;
