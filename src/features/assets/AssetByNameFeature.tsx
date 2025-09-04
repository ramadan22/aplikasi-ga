'use client';

import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';

import { defaultParams } from '@/data/Table';
import { messageSuccess } from '@/lib/react-toastify';
import DeleteConfirmModal from '@/ui/components/common/ModalConfirm';
import TableDataUI from '@/ui/components/common/TableData';
import { Modal } from '@/ui/components/simple/modal';
import { useModal } from '@/utils/UseModal';
import { handlePaginationChange } from '@/utils/UseTable';
import { DataAssetsByName, Props } from '../assets/types';
import Form from './Form';
import { Delete, GetByName } from './hooks/UseAssets';
import UseStable from './hooks/UseTable';

const AssetsByNameFeature = ({ params }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const getParams = useParams();
  const searchParams = useSearchParams();

  const { tableHeadersAssetByName, action, setAction, keyword, setKeyword } = UseStable();
  const { isOpen, openModal, closeModal } = useModal();

  const {
    data: assets,
    isLoading,
    refetch,
  } = GetByName({ ...params, keyword, name: `${getParams.name || ''}` });

  const { mutate: deleteData, isPending: pendingDeleteData } = Delete({
    onSuccess: async res => {
      messageSuccess(res.message);
      modalClosed();
      const refreshed = await refetch();
      if (!refreshed.data?.data || refreshed.data.data.length === 0) {
        router.push('/assets');
        return;
      }
    },
  });

  const modalClosed = () => {
    closeModal();
    setAction({ id: '', action: '' });
  };

  return (
    <>
      <TableDataUI
        isButtonAdd={false}
        isButtonDetail={false}
        headers={tableHeadersAssetByName}
        data={assets?.data}
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
            setAction({ id, action: value, data: data as DataAssetsByName });
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
          handleSuccess={async value => {
            if (value) {
              const refreshed = await refetch();
              if (!refreshed.data?.data || refreshed.data.data.length === 0) {
                router.push('/assets');
                return;
              }
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

export default AssetsByNameFeature;
