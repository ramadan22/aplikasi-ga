'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { defaultParams } from '@/data/Table';
import { messageSuccess } from '@/lib/react-toastify';
import DeleteConfirmModal from '@/ui/components/common/ModalConfirm';
import TableDataUI from '@/ui/components/common/TableData';
import { Modal } from '@/ui/components/simple/modal';
import { useModal } from '@/utils/UseModal';
import { handlePaginationChange } from '@/utils/UseTable';
import Form from './Form';
import { Delete, Get } from './hooks/UseCategory';
import UseStable from './hooks/UseTable';
import { FormParams, Props } from './types';

const CategoriesFeature = ({ params }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { tableHeaders, keyword, setKeyword, action, setAction } = UseStable();
  const { isOpen, openModal, closeModal } = useModal();

  const { data: categories, isLoading, refetch } = Get({ ...params, keyword });
  const { mutate: deleteData, isPending: pendingDeleteData } = Delete({
    onSuccess: res => {
      messageSuccess(res.message);
      modalClosed();
      refetch();
    },
  });

  const modalClosed = () => {
    closeModal();
    setAction({ id: '', action: '' });
  };

  return (
    <>
      <TableDataUI
        headers={tableHeaders}
        data={categories?.data}
        isLoading={isLoading}
        handleChangeParams={(key, value) => {
          if (key === 'search') {
            setKeyword(value as string);
            return;
          }

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
          if (value === 'edit' || value === 'delete')
            setAction({ id, action: value, data: data as FormParams });
        }}
        meta={{
          // sorter: categories?.meta?.sorter || '',
          size: Number(searchParams.get('limit')) || defaultParams.size,
          page: Number(searchParams.get('page')) || defaultParams.page,
          total: categories?.meta?.total || 0,
        }}
      />
      <DeleteConfirmModal
        isOpen={action.action === 'delete'}
        onClose={() => modalClosed()}
        onConfirm={() => deleteData(action.id as string)}
        isLoading={pendingDeleteData}
        title="Are you sure?"
        description="This data will be permanently removed from the system."
      />
      <Modal
        isOpen={isOpen || action.action === 'edit'}
        onClose={() => modalClosed()}
        className="max-w-[700px] p-6 lg:p-10"
      >
        <Form
          id={action.id as string}
          data={action.data}
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
    </>
  );
};

export default CategoriesFeature;
