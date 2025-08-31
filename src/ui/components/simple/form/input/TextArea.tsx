import { cn } from '@/lib/classnames';
import React from 'react';

interface TextareaProps {
  id?: string;
  placeholder?: string;
  rows?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  disabled?: boolean;
  error?: boolean;
  hint?: string;
}

const TextArea: React.FC<TextareaProps> = ({
  id = '',
  placeholder = 'Enter your message',
  rows = 3,
  value = '',
  onChange,
  className = '',
  disabled = false,
  error = false,
  hint = '',
}) => (
  <div className="relative">
    <textarea
      id={id}
      placeholder={placeholder}
      rows={rows}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={cn(
        'w-full rounded-lg border px-4 border-gray-300 dark:border-gray-700 py-2.5 text-sm shadow-theme-xs focus:outline-hidden dark:text-white placeholder:text-gray-400',
        disabled &&
          'bg-gray-100 opacity-50 text-gray-500 dark:text-gray-400 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:border-gray-700',
        error &&
          'bg-transparent text-gray-400 border-gray-300 focus:border-error-300 focus:ring-3 focus:ring-error-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-error-800',
        className,
      )}
    />
    {hint && (
      <p
        className={`mt-2 text-sm ${error ? 'text-error-500' : 'text-gray-500 dark:text-gray-400'}`}
      >
        {hint}
      </p>
    )}
  </div>
);

export default TextArea;
