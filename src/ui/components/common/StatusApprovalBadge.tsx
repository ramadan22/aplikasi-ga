import { RequestStatus } from '@/constants/Approval';
import { cn } from '@/lib/classnames';

export const statusColors: Record<RequestStatus, string> = {
  [RequestStatus.DRAFT]:
    'bg-gray-100 text-gray-700 border border-gray-300 ' +
    'dark:bg-gray-100/15 dark:text-gray-600 dark:border-gray-800',

  [RequestStatus.WAITING_APPROVAL]:
    'bg-yellow-100 text-yellow-700 border border-yellow-300 ' +
    'dark:bg-yellow-100/15 dark:text-yellow-600 dark:border-yellow-800',

  [RequestStatus.DONE]:
    'bg-green-100 text-green-700 border border-green-300 ' +
    'dark:bg-green-100/15 dark:text-green-600 dark:border-green-800',

  [RequestStatus.REJECT]:
    'bg-red-100 text-red-700 border border-red-300 ' +
    'dark:bg-red-100/15 dark:text-red-600 dark:border-red-800',
};

const StatusApprovalBadge = ({
  status,
  label,
}: {
  status: RequestStatus | string;
  label: string;
}) => {
  const color = (Object.values(RequestStatus) as string[]).includes(status)
    ? statusColors[status as RequestStatus]
    : '';

  return <span className={cn('px-4 py-1 text-xs font-medium rounded-full', color)}>{label}</span>;
};

export default StatusApprovalBadge;
