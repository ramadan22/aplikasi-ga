import { Role, RoleLabel } from '@/constants/Role';
import BooleanBadge from '@/ui/components/common/BooleanBadge';
import { useState } from 'react';
import { DataUsers, DataUsersRegister } from '../types';
import { TableAction } from '../types/Table';

const UseStable = () => {
  const tableHeaders = [
    {
      key: 'id',
      header: 'ID',
    },
    {
      key: 'firstName',
      header: 'First Name',
    },
    // {
    //   key: 'lastName',
    //   header: 'Last Name',
    // },
    {
      key: 'email',
      header: 'Email',
    },
    // {
    //   key: 'socialMedia',
    //   header: 'Social Media',
    //   render: () => '',
    // },
    {
      key: 'role',
      header: 'Role',
      render: (value: Role) => RoleLabel[value],
    },
    {
      key: 'isActive',
      header: 'Active',
      render: (value: boolean) => (
        <BooleanBadge value={value} labels={['ya', 'tidak']} className="px-5" />
      ),
    },
    {
      key: 'createdAt',
      header: 'CreatedAt',
    },
    {
      key: 'updatedAt',
      header: 'UpdatedAt',
    },
  ];

  const [keyword, setKeyword] = useState('');
  const [action, setAction] = useState<TableAction<DataUsers>>({
    id: '',
    type: '',
    data: undefined,
  });

  const [detailNewUser, setDetailNewuser] = useState<DataUsersRegister>();

  return {
    tableHeaders,
    action,
    setAction,
    keyword,
    setKeyword,
    detailNewUser,
    setDetailNewuser,
  };
};

export default UseStable;
