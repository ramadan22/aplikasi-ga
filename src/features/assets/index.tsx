'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { defaultParams } from '@/data/Table';
import { messageSuccess } from '@/lib/react-toastify';
import DeleteConfirmModal from '@/ui/components/common/ModalConfirm';
import TableDataUI from '@/ui/components/common/TableData';
import { Modal } from '@/ui/components/simple/modal';
import { requestNotificationPermission, showNotification } from '@/utils/Notification';
import { useModal } from '@/utils/UseModal';
import { handlePaginationChange } from '@/utils/UseTable';
import { FormParams, Props } from '../assets/types';
import Form from './Form';
import { Delete, Get } from './hooks/UseAssets';
import UseStable from './hooks/UseTable';

const AssetsFeature = ({ params }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { tableHeaders, action, setAction } = UseStable();
  const { isOpen, openModal, closeModal } = useModal();

  const { data: assets, isLoading, refetch } = Get(params);
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

  const handleClick = async () => {
    const allowed = await requestNotificationPermission();
    console.log('Permission setelah request:', Notification.permission, 'Allowed:', allowed);

    if (allowed) {
      showNotification('Halo!', {
        body: 'Ini notifikasi dari aplikasi Next.js 🚀',
        duration: 5000,
        // icon: '/icon.png',
        // data: { url: 'https://example.com' },
      });
    }
  };

  return (
    <>
      <button onClick={handleClick} className="px-4 py-2 bg-blue-500 text-white rounded">
        Tampilkan Notifikasi
      </button>
      <TableDataUI
        headers={tableHeaders}
        data={assets?.data}
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
          if (value === 'edit' || value === 'delete')
            setAction({ id, action: value, data: data as FormParams });
        }}
        meta={{
          // sorter: assets?.meta?.sorter || '',
          size: Number(searchParams.get('limit')) || defaultParams.size,
          page: Number(searchParams.get('page')) || defaultParams.page,
          total: assets?.meta?.total || 0,
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

export default AssetsFeature;
