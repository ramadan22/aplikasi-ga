import { ActionTable } from '@/features/assets/types';
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
      key: 'code',
      header: 'Code',
    },
    {
      key: 'quantity',
      header: 'Quantity',
    },
    {
      key: 'category',
      header: 'Category',
      render: (item: { value: string; label: string }) => item.label,
    },
    {
      key: 'isMaintenance',
      header: 'Maintenance',
      render: (value: boolean) => (value ? 'ya' : 'tidak'),
    },
    {
      key: 'createdAt',
      header: 'CreatedAt',
    },
  ];

  const [action, setAction] = useState<ActionTable>({
    id: '',
    action: '',
    data: undefined,
  });

  return {
    tableHeaders,
    action,
    setAction,
  };
};

export default UseStable;
