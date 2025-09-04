'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { defaultParams } from '@/data/Table';
import TableDataUI from '@/ui/components/common/TableData';
import { Modal } from '@/ui/components/simple/modal';
import { useModal } from '@/utils/UseModal';
import { handlePaginationChange } from '@/utils/UseTable';
import { Props } from '../assets/types';
import Form from './Form';
import { Get } from './hooks/UseAssets';
import UseStable from './hooks/UseTable';

const AssetsFeature = ({ params }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isOpen, openModal, closeModal } = useModal();

  const { tableHeaders, setAction, action, keyword, setKeyword } = UseStable();

  const { data: assets, isLoading, refetch } = Get({ ...params, keyword });

  const modalClosed = () => {
    closeModal();
    setAction({ id: '', action: '' });
  };

  return (
    <>
      <TableDataUI
        isButtonDetail
        isButtonDelete={false}
        isButtonEdit={false}
        headers={tableHeaders}
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
        handleButtonAction={(key, __, item) => {
          const segment = (item as { name: string })?.name;
          if (key === 'add') openModal();
          if (key === 'detail')
            router.push(`/assets/${encodeURIComponent(segment)}?page=1&limit=10`);
        }}
        meta={{
          // sorter: assets?.meta?.sorter || '',
          size: Number(searchParams.get('limit')) || defaultParams.size,
          page: Number(searchParams.get('page')) || defaultParams.page,
          total: assets?.meta?.total || 0,
        }}
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
