import { cn } from '@/lib/classnames';
import React from 'react';

interface ComponentCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string; // Additional custom classes for styling
  desc?: string; // Description text
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = '',
  desc = '',
}) => {
  return (
    <div
      className={`sm:rounded-2xl rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      {/* Card Header */}
      {title && (
        <div className="px-6 py-5">
          <h3 className="text-base font-medium text-gray-800 dark:text-white/90">{title}</h3>
          {desc && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{desc}</p>}
        </div>
      )}

      {/* Card Body */}
      <div
        className={cn(
          title && 'border-t',
          'p-2 sm:p-4 pb-0 border-gray-100 dark:border-gray-800 relative',
        )}
      >
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;
