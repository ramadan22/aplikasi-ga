'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { defaultParams } from '@/data/Table';
import { messageSuccess } from '@/lib/react-toastify';
import { IAssetByName } from '@/services/asset/types';
import ModalConfirm from '@/ui/components/common/ModalConfirm';
import TableDataUI from '@/ui/components/common/TableData';
import { Modal } from '@/ui/components/simple/modal';
import { useModal } from '@/utils/UseModal';
import UsePagination from '@/utils/UsePagination';
import { Props } from '../assets/types';
import Detail from './Detail';
import Form from './Form';
import { Delete, GetByName } from './hooks/UseAssets';
import UseStable from './hooks/UseTable';

const AssetsByNameFeature = ({ params }: Props) => {
  const router = useRouter();
  const getParams = useParams();
  const searchParams = useSearchParams();
  const { handlePaginationChange } = UsePagination();

  const { tableHeadersAssetByName, action, setAction, keyword, setKeyword } = UseStable();
  const { openModal, closeModal } = useModal();

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
    setAction({ id: '', type: '' });
  };

  return (
    <>
      <TableDataUI<IAssetByName>
        isButtonDetail
        isButtonAdd={false}
        headers={tableHeadersAssetByName}
        data={assets?.data}
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
          if (value === 'edit' || value === 'delete' || value === 'detail')
            setAction({ id, type: value, data });
        }}
        meta={{
          // sorter: assets?.meta?.sorter || '',
          size: Number(searchParams.get('limit')) || defaultParams.size,
          page: Number(searchParams.get('page')) || defaultParams.page,
          total: assets?.meta?.total || 0,
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
        isOpen={action.type === 'add' || action.type === 'edit'}
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
      <Modal
        size="md"
        isOpen={action.type === 'detail'}
        onClose={() => modalClosed()}
        className="max-w-[700px] p-6 lg:p-10"
      >
        <Detail data={action.data || null} />
      </Modal>
    </>
  );
};

export default AssetsByNameFeature;
