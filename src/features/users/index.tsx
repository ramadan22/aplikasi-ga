'use client';

import { useSearchParams } from 'next/navigation';

import { defaultParams } from '@/data/Table';
import { messageError, messageSuccess } from '@/lib/react-toastify';
import ModalConfirm from '@/ui/components/common/ModalConfirm';
import TableDataUI from '@/ui/components/common/TableData';
import { Modal } from '@/ui/components/simple/modal';
import { ErrorConvertToMessage } from '@/utils';
import UsePagination from '@/utils/UsePagination';
import UserProfileFeature from '../profile';
import DetailUserPassword from './DetailUserPassword';
import Form from './Form';
import { PostResetPassword } from './hooks/UseResetPassword';
import UseStable from './hooks/UseTable';
import { Get } from './hooks/UseUsers';
import { DataUsers, DataUsersRegister, Props } from './types';

const UsersFeature = ({ params }: Props) => {
  const searchParams = useSearchParams();
  const { handlePaginationChange } = UsePagination();

  const { tableHeaders, setAction, action, keyword, setKeyword, detailNewUser, setDetailNewuser } =
    UseStable();

  const { data: users, isLoading, refetch } = Get({ ...params, keyword });
  const { mutate: resetPassword, isPending: pendingResetPassword } = PostResetPassword({
    onSuccess: res => {
      const data: unknown = res.data;
      setAction({ id: 'RESET_PASSWORD', type: 'detail_new_user' });
      setDetailNewuser(data as DataUsersRegister);
      messageSuccess(res.message);
    },
    onError: err => {
      messageError(ErrorConvertToMessage(err));
    },
  });

  const modalClosed = () => {
    setAction({ id: '', type: '' });
  };

  const sendEmail = () => {
    console.log('here');
  };

  return (
    <>
      <TableDataUI<DataUsers>
        isButtonDetail
        isButtonDelete={false}
        isButtonEdit={false}
        headers={tableHeaders}
        data={users?.data}
        isLoading={isLoading}
        handleChangeParams={(key, value) => {
          if (key === 'search') {
            setKeyword(value as string);
            return;
          }

          handlePaginationChange({ key, value });
        }}
        handleButtonAction={(key, id) => {
          if (key === 'add') setAction({ id: '', type: 'add' });
          if (key === 'detail') setAction({ id, type: 'detail_user' });
        }}
        meta={{
          // sorter: users?.meta?.sorter || '',
          size: Number(searchParams.get('limit')) || defaultParams.size,
          page: Number(searchParams.get('page')) || defaultParams.page,
          total: users?.meta?.total || 0,
        }}
      />

      <Modal
        center
        onClose={() => modalClosed()}
        className="max-w-[700px] p-6 lg:p-10"
        isOpen={action.type === 'detail_new_user'}
      >
        <DetailUserPassword
          data={detailNewUser}
          type={action.id as 'RESET_PASSWORD'}
          modalClosed={() => modalClosed()}
          handleSendEmail={() => sendEmail()}
        />
      </Modal>

      <Modal
        size="lg"
        center
        onClose={() => modalClosed()}
        className="max-w-[700px] p-6 lg:p-10"
        isOpen={action.type === 'detail_user'}
      >
        <div className="space-y-6 pb-10">
          <UserProfileFeature
            handleReset={() => setAction({ ...action, type: 'reset_password' })}
            userId={action.id}
          />
        </div>
      </Modal>

      <Modal
        center
        onClose={() => modalClosed()}
        className="max-w-[700px] p-6 lg:p-10"
        isOpen={action.type === 'add' || action.type === 'edit'}
      >
        <Form
          id={action.id as string}
          data={action.data as DataUsers}
          handleSuccess={(success, data) => {
            if (success) {
              refetch();
              modalClosed();

              if (data) {
                setAction({ type: 'detail_new_user' });
                setDetailNewuser(data as DataUsersRegister);
              }
            }
          }}
          handleModal={value => {
            if (!value) modalClosed();
          }}
        />
      </Modal>

      <ModalConfirm
        type="info"
        isOpen={action.type === 'reset_password'}
        onClose={() => modalClosed()}
        onConfirm={() => resetPassword({ id: action.id || '' })}
        isLoading={pendingResetPassword}
        title="Reset Password?"
        description="Are you sure you want to reset this user's password? A new password will be generated."
      />
    </>
  );
};

export default UsersFeature;
