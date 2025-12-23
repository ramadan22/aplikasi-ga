'use client';

import { useSearchParams } from 'next/navigation';

import { defaultParams } from '@/data/Table';
import { messageSuccess } from '@/lib/react-toastify';
import { ICategory } from '@/services/category/types';
import ModalConfirm from '@/ui/components/common/ModalConfirm';
import TableDataUI from '@/ui/components/common/TableData';
import { Modal } from '@/ui/components/simple/modal';
import { useModal } from '@/utils/UseModal';
import UsePagination from '@/utils/UsePagination';
import Form from './Form';
import { Delete, Get } from './hooks/UseCategory';
import UseStable from './hooks/UseTable';
import { Props } from './types';

const CategoriesFeature = ({ params }: Props) => {
  const searchParams = useSearchParams();
  const { handlePaginationChange } = UsePagination();

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
    setAction({ id: '', type: '' });
  };

  return (
    <>
      <TableDataUI<ICategory>
        headers={tableHeaders}
        data={categories?.data}
        isLoading={isLoading}
        handleChangeParams={(key, value) => {
          if (key === 'search') {
            setKeyword(value as string);
            return;
          }

          handlePaginationChange({ key, value });
        }}
        handleButtonAction={(value, id, data) => {
          if (value === 'add') openModal();
          if (value === 'edit' || value === 'delete') setAction({ id, type: value, data });
        }}
        meta={{
          // sorter: categories?.meta?.sorter || '',
          size: Number(searchParams.get('limit')) || defaultParams.size,
          page: Number(searchParams.get('page')) || defaultParams.page,
          total: categories?.meta?.total || 0,
        }}
      />
      <ModalConfirm
        isOpen={action.type === 'delete'}
        onClose={() => modalClosed()}
        onConfirm={() => deleteData(action.id as string)}
        isLoading={pendingDeleteData}
        title="Are you sure?"
        description="This data will be permanently removed from the system."
      />
      <Modal
        center
        isOpen={isOpen || action.type === 'edit'}
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
