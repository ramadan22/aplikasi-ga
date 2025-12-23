'use client';

import React from 'react';
import { FaInfo, FaRegTrashAlt } from 'react-icons/fa';

import ButtonWithSpinner from '../simple/button/ButtonWithSpinner';
import { Modal } from '../simple/modal';

interface ModalConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  title?: string;
  description?: string;
  type?: 'delete' | 'info';
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  title,
  description,
  type = 'delete',
}) => {
  return (
    <Modal center isOpen={isOpen} onClose={onClose} className="max-w-lg p-6 sm:p-8">
      <div className="text-center">
        {type === 'info' && (
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-500/10">
            <FaInfo className="text-yellow-600 dark:text-yellow-400" />
          </div>
        )}
        {type === 'delete' && (
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-error-100 dark:bg-error-500/10">
            <FaRegTrashAlt />
          </div>
        )}
        <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>
        <p className="mb-10 text-sm text-gray-600 dark:text-gray-400">{description}</p>

        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
          >
            Cancel
          </button>
          <ButtonWithSpinner
            isLoading={isLoading}
            onClick={() => onConfirm()}
            className="bg-error-600 hover:bg-error-700 text-white px-6"
          >
            {(type === 'info' && 'Submit') || (type === 'delete' && 'Delete') || ''}
          </ButtonWithSpinner>
        </div>
      </div>
    </Modal>
  );
};

export default ModalConfirm;
