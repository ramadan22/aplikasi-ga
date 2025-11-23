'use client';

import { cn } from '@/lib/classnames';
import React, { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  size?: 'sm' | 'md' | 'lg';
  center?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className = '',
  showCloseButton = true,
  size,
  center,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const getSizeClass = (size: 'sm' | 'md' | 'lg' = 'sm') => {
    switch (size) {
      case 'md':
        return 'sm:max-w-2xl';
      case 'lg':
        return 'sm:max-w-4xl';
      case 'sm':
      default:
        return 'sm:max-w-lg';
    }
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 overflow-y-auto z-[99] sm:py-5 py-0',
        center && 'flex items-center',
      )}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 sm:bg-gray-400/50 sm:backdrop-blur-[32px] bg-white dark:bg-gray-900"
        onClick={onClose}
      />

      {/* Modal content */}
      <div
        ref={modalRef}
        className={cn(
          'relative w-full p-4 border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] sm:rounded-3xl sm:max-w-lg md:h-auto sm:p-6 mx-auto',
          getSizeClass(size),
          className,
        )}
        onClick={e => e.stopPropagation()}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white sm:right-6 sm:top-6 sm:h-11 sm:w-11"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.04289 16.5413C5.65237 16.9318 5.65237 17.565 6.04289 17.9555C6.43342 18.346 7.06658 18.346 7.45711 17.9555L11.9987 13.4139L16.5408 17.956C16.9313 18.3466 17.5645 18.3466 17.955 17.956C18.3455 17.5655 18.3455 16.9323 17.955 16.5418L13.4129 11.9997L17.955 7.4576C18.3455 7.06707 18.3455 6.43391 17.955 6.04338C17.5645 5.65286 16.9313 5.65286 16.5408 6.04338L11.9987 10.5855L7.45711 6.0439C7.06658 5.65338 6.43342 5.65338 6.04289 6.0439C5.65237 6.43442 5.65237 7.06759 6.04289 7.45811L10.5845 11.9997L6.04289 16.5413Z"
                fill="currentColor"
              />
            </svg>
          </button>
        )}
        <div>
          {children}
          <div className="pb-5" />
        </div>
      </div>
    </div>
  );
};
