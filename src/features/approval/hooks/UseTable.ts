import { DummyApprovals } from '@/data/Approval';
import { ActionTable } from '@/features/approval/types';
import StatusBadge from '@/ui/components/common/StatusBadge';
import { useState } from 'react';

const UseStable = () => {
  const tableHeaders = [
    {
      key: 'id',
      header: 'ID',
    },
    {
      key: 'submissionType',
      header: 'Submission',
    },
    {
      key: 'status',
      header: 'Status',
      render: (value: string) => StatusBadge({ status: value }),
    },
    // {
    //   key: 'note',
    //   header: 'Note',
    // },
    // {
    //   key: 'approved_by',
    //   header: 'Approved By',
    // },
    // {
    //   key: 'asset_request',
    //   header: 'Asset Request',
    // },
    {
      key: 'created_by',
      header: 'Created By',
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
    DummyApprovals,
  };
};

export default UseStable;
