import { ICategory } from '@/services/category/types';
import BooleanBadge from '@/ui/components/common/BooleanBadge';
import { useState } from 'react';
import { TableAction } from '../types/Table';

const UseStable = () => {
  const tableHeaders = [
    {
      key: 'id',
      header: 'ID',
    },
    {
      key: 'name',
      header: 'Name',
    },
    {
      key: 'prefix',
      header: 'Prefix',
    },
    {
      key: 'isDevice',
      header: 'Device',
      render: (value: boolean) => {
        return <BooleanBadge value={value} labels={['Device', 'Non-Device']} />;
      },
    },
    {
      key: 'createdAt',
      header: 'CreatedAt',
    },
  ];

  const [keyword, setKeyword] = useState('');
  const [action, setAction] = useState<TableAction<ICategory>>({
    id: '',
    type: '',
    data: undefined,
  });

  return {
    tableHeaders,
    keyword,
    setKeyword,
    action,
    setAction,
  };
};

export default UseStable;
