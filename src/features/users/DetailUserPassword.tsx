/* eslint-disable quotes */

import { RoleLabel } from '@/constants/Role';
import Tooltip from '@/ui/components/common/Tooltip';
import { useRef, useState } from 'react';
import { DataUsersRegister } from './types';

type Type = 'NEW_USER' | 'RESET_PASSWORD';

interface Props {
  modalClosed: () => void;
  data: DataUsersRegister | undefined;
  type?: Type;
  handleSendEmail?: (type: Type) => void;
}

const DetailNewUser = ({ modalClosed, data, type = 'NEW_USER', handleSendEmail }: Props) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const title =
    (type === 'NEW_USER' && 'User Created Successfully 🎉') ||
    (type === 'RESET_PASSWORD' && 'Password Reset Successfully 🔐') ||
    '';

  const description =
    (type === 'NEW_USER' &&
      'The user account has been created and a temporary password has been generated.') ||
    (type === 'RESET_PASSWORD' &&
      "The user's password has been reset and a temporary password has been generated.") ||
    '';

  const info =
    (type === 'NEW_USER' && (
      <>
        ⚠️&nbsp;
        <strong>Important:</strong>
        &nbsp;Please ask the user to change their password immediately after first login to ensure
        account security.
      </>
    )) ||
    (type === 'RESET_PASSWORD' && (
      <>
        ⚠️&nbsp;
        <strong>Important:</strong>
        &nbsp;Please instruct the user to update their password immediately after logging in to
        maintain account security.
      </>
    )) ||
    '';

  const handleCopy = () => {
    navigator.clipboard.writeText(`${data?.plainPassword}`);

    setShowTooltip(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setShowTooltip(false);
    }, 2000);
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
          <p className="mt-1 text-gray-500">{description}</p>
        </div>

        <button
          onClick={modalClosed}
          className="rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200"
        >
          ✕
        </button>
      </div>

      {/* User Info Card */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">First Name</p>
            <p className="font-medium text-gray-900">{data?.firstName}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium text-gray-900">{data?.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Role</p>
            <span className="inline-flex items-center rounded-md bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
              {data?.role ? RoleLabel[data?.role] : ''}
            </span>
          </div>

          <div>
            <p className="text-sm text-gray-500">Status</p>
            <span className="inline-flex items-center rounded-md bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
              {data?.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      </div>

      {/* Password Section */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-2">Temporary Password</p>

        <div className="flex items-center justify-between rounded-lg border border-dashed border-blue-300 bg-blue-50 px-4 py-3">
          <span className="font-mono text-lg tracking-widest text-blue-700">
            {data?.plainPassword}
          </span>

          <button
            className="text-sm font-medium text-blue-600 hover:underline"
            onClick={() => {
              navigator.clipboard.writeText(`${data?.plainPassword}`);
              handleCopy();
            }}
          >
            <Tooltip
              sideClassName="w-[110px] px-2 py-1 text-[10px] bg-[#000000] text-[#FFFFFF] rounded-lg"
              content="Copied to clipboard"
              open={showTooltip} // ⬅️ kontrol manual
            >
              Copy
            </Tooltip>
          </button>
        </div>

        <p className="mt-2 text-xs text-gray-500">
          This password is generated automatically and should be shared securely.
        </p>
      </div>

      {/* Warning */}
      <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 mb-8">
        <p className="text-sm text-amber-800">{info}</p>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end gap-3">
        <button
          onClick={modalClosed}
          className="rounded-lg border border-gray-300 px-5 py-2.5 text-gray-700 hover:bg-gray-50"
        >
          Close
        </button>

        <button
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
          onClick={() => {
            if (handleSendEmail) handleSendEmail(type);
          }}
        >
          Send Email
        </button>
      </div>
    </>
  );
};

export default DetailNewUser;
