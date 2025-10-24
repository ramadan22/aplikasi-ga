import { ActionTable } from '@/features/assets/types';
import BooleanBadge from '@/ui/components/common/BooleanBadge';
import { useState } from 'react';

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
      key: 'quantity',
      header: 'Quantity',
    },
    {
      key: 'category',
      header: 'Category',
      render: (item: { name: string }) => item.name,
    },
  ];

  const tableHeadersAssetByName = [
    {
      key: 'id',
      header: 'ID',
    },
    {
      key: 'name',
      header: 'Name',
    },
    {
      key: 'serialNumber',
      header: 'Serial Number',
    },
    {
      key: 'code',
      header: 'Code',
    },
    {
      key: 'category',
      header: 'Category',
      render: (item: { name: string }) => item.name,
    },
    {
      key: 'isMaintenance',
      header: 'Maintenance',
      render: (value: boolean) => <BooleanBadge value={value} labels={['ya', 'tidak']} />,
    },
    {
      key: 'createdAt',
      header: 'CreatedAt',
    },
  ];

  const [keyword, setKeyword] = useState('');
  const [action, setAction] = useState<ActionTable>({
    id: '',
    action: '',
    data: undefined,
  });

  return {
    tableHeaders,
    action,
    setAction,
    tableHeadersAssetByName,
    keyword,
    setKeyword,
  };
};

export default UseStable;
