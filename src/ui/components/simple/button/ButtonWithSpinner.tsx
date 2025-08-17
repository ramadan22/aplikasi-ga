'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonWithSpinnerProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
};

const ButtonWithSpinner: React.FC<ButtonWithSpinnerProps> = ({
  children,
  onClick,
  type = 'button',
  isLoading = false,
  disabled = false,
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading || disabled}
      className={twMerge(
        'flex items-center justify-center rounded-lg bg-brand-500 dark:bg-brand-500/[0.12] px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto',
        className,
      )}
    >
      {isLoading && (
        <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
      )}
      {children}
    </button>
  );
};

export default ButtonWithSpinner;
