import { useState } from 'react';
import { ActionTable } from '../types';

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
