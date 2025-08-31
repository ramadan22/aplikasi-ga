import { cn } from '@/lib/classnames';

type Status =
  | 'draft'
  | 'waiting approval'
  | 'ready on progress'
  | 'on progress'
  | 'done'
  | 'reject'
  | string;

const statusColors: Record<Status, string> = {
  draft:
    'bg-gray-100 text-gray-700 border border-gray-300 ' +
    'dark:bg-gray-100/15 dark:text-gray-600 dark:border-gray-800',

  'waiting approval':
    'bg-yellow-100 text-yellow-700 border border-yellow-300 ' +
    'dark:bg-yellow-100/15 dark:text-yellow-600 dark:border-yellow-800',

  'ready on progress':
    'bg-blue-100 text-blue-700 border border-blue-300 ' +
    'dark:bg-blue-100/15 dark:text-blue-600 dark:border-blue-800',

  'on progress':
    'bg-indigo-100 text-indigo-700 border border-indigo-300 ' +
    'dark:bg-indigo-100/15 dark:text-indigo-600 dark:border-indigo-800',

  done:
    'bg-green-100 text-green-700 border border-green-300 ' +
    'dark:bg-green-100/15 dark:text-green-600 dark:border-green-800',

  reject:
    'bg-red-100 text-red-700 border border-red-300 ' +
    'dark:bg-red-100/15 dark:text-red-600 dark:border-red-800',

  '': '',
};

const StatusBadge = ({ status }: { status: Status | string }) => (
  <span
    className={cn(
      'px-3 pt-1 pb-1.5 text-sm font-medium rounded-full',
      status && statusColors[status],
    )}
  >
    {status}
  </span>
);

export default StatusBadge;
