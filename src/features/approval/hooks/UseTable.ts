import {
  RequestStatus,
  RequestStatusLabel,
  SubmissionType,
  SubmissionTypeLabel,
} from '@/constants/Approval';
import { Role, RoleLabel } from '@/constants/Role';
import { ActionTable } from '@/features/approval/types/Table';
import StatusApprovalBadge from '@/ui/components/common/StatusApprovalBadge';
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
      render: (submission: SubmissionType) => SubmissionTypeLabel[submission],
    },
    {
      key: 'status',
      header: 'Status',
      render: (status: RequestStatus) =>
        StatusApprovalBadge({ status, label: RequestStatusLabel[status] }),
    },
    {
      key: 'createdBy',
      header: 'Created By',
      render: (row: { firstName: string; role: Role }) =>
        `${row.firstName} (${RoleLabel[row.role]})`,
    },
    {
      key: 'createdAt',
      header: 'Created At',
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
