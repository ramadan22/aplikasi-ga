import { cn } from '@/lib/classnames';

interface BooleanBadgeProps {
  value: boolean | null | undefined;
  labels: [string, string]; // [labelUntukTrue, labelUntukFalse]
  className?: string;
}

const booleanColors: Record<'true' | 'false', string> = {
  true:
    'bg-green-100 text-green-700 border border-green-300 ' +
    'dark:bg-green-100/15 dark:text-green-600 dark:border-green-800',

  false:
    'bg-gray-100 text-gray-700 border border-gray-300 ' +
    'dark:bg-gray-100/15 dark:text-gray-600 dark:border-gray-800',
};

const BooleanBadge = ({ value, labels, className }: BooleanBadgeProps) => {
  const key = value ? 'true' : 'false';
  const label = value ? labels[0] : labels[1];

  return (
    <span
      className={cn(
        'px-3 pt-1 pb-1.5 text-sm font-medium rounded-full',
        booleanColors[key],
        className,
      )}
    >
      {label}
    </span>
  );
};

export default BooleanBadge;
