'use client';

import {
  RequestStatus,
  RequestStatusLabel,
  SubmissionType,
  SubmissionTypeLabel,
} from '@/constants/Approval';
import { Role, RoleLabel } from '@/constants/Role';
import Button from '@/ui/components/simple/button/Button';
import { useSession } from 'next-auth/react';
import { FaEye } from 'react-icons/fa';
import { GetReviewedSignature } from './hooks/UseApproval';
import UseDetail from './hooks/UseDetail';
import { PropsDetail } from './types/Detail';

const Detail = ({ handleProcess, handleReject, data }: PropsDetail) => {
  const { data: loginData } = useSession();

  if (!data) return null;

  const { createdByName, groupedAssets, isEdit } = UseDetail(data);

  const { data: reviewedSig, isLoading } = GetReviewedSignature(data.id);

  return (
    <>
      <div className="px-1">
        <h5 className="mb-2 font-semibold text-gray-800 dark:text-white/90 text-xl lg:text-2xl">
          Approval Detail
        </h5>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          View complete information of selected submission.
        </p>
      </div>

      <div className="mt-8 space-y-4">
        {/* Basic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 px-1">
          <DetailItem
            label="Submission Type"
            value={SubmissionTypeLabel[data.submissionType as SubmissionType]}
          />
          <DetailItem label="Status" value={RequestStatusLabel[data.status as RequestStatus]} />
          <DetailItem label="Requested By" value={createdByName} />
          <DetailItem label="Email" value={data.createdBy.email} />
          <DetailItem label="Role" value={RoleLabel[data.createdBy.role]} />
          <DetailItem label="Created At" value={data.createdAt} />
        </div>

        {/* Notes */}
        <div className="bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-lg p-4">
          <p className="text-base font-medium text-gray-600 dark:text-gray-400">Notes</p>
          <p className="text-sm font-semibold text-gray-900 dark:text-white mt-2">
            {data.notes || '-'}
          </p>
        </div>

        {/* ✅ GROUPED ASSETS */}
        {data.assets.length > 0 && (
          <div className="border border-gray-100 dark:border-gray-800 rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
              <p className="text-base font-semibold text-gray-800 dark:text-white">
                Requested Assets
              </p>
            </div>

            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-400">
                <tr>
                  <th className="text-left px-4 py-2 font-medium">Name</th>
                  <th className="text-left px-4 py-2 font-medium">Total Unit</th>
                  <th className="text-left px-4 py-2 font-medium">Maintenance</th>
                  <th className="text-left px-4 py-2 font-medium">Category</th>
                </tr>
              </thead>
              <tbody>
                {groupedAssets.length ? (
                  groupedAssets.map(item => (
                    <tr key={item.name} className="border-t border-gray-100 dark:border-gray-800">
                      <td className="px-4 py-2 font-semibold text-gray-900 dark:text-white">
                        {item.name}
                      </td>
                      <td className="px-4 py-2 text-gray-900 dark:text-white">{item.count}</td>
                      <td className="px-4 py-2">
                        {item.isMaintenance ? (
                          <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-800">
                            Yes
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">
                            No
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">
                        {item?.category?.name || ''}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-3 text-center text-gray-500 dark:text-gray-400"
                    >
                      No assets requested.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* ✅ APPROVAL HISTORY */}
        {data.signatures.length > 0 && (
          <div className="border border-gray-100 dark:border-gray-800 rounded-lg overflow-hidden">
            <div className="flex justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
              <p className="text-base font-semibold text-gray-800 dark:text-white">Signers</p>
              {data.status !== RequestStatus.REJECT && loginData?.user.role === Role.GA && (
                <Button
                  disabled={isLoading}
                  onClick={() => {
                    window.open(`/approval-document?id=${data.id}`, '_blank');
                  }}
                  variant={reviewedSig?.data?.isReviewed ? 'outline' : 'primary'}
                  size="xs"
                  className="px-2 py-1 rounded text-[10px] border-none shadow-none"
                >
                  <FaEye />
                  Review Document
                </Button>
              )}
            </div>

            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-400">
                <tr>
                  <th className="text-left px-4 py-2 font-medium">Approver</th>
                  <th className="text-left px-4 py-2 font-medium">Email</th>
                  <th className="text-left px-4 py-2 font-medium">Role</th>
                  <th className="text-left px-4 py-2 font-medium">Signed At</th>
                </tr>
              </thead>
              <tbody>
                {data.signatures?.length ? (
                  data.signatures.map(item => (
                    <tr key={item.id} className="border-t border-gray-100 dark:border-gray-800">
                      <td className="px-4 py-2 font-semibold text-gray-900 dark:text-white">
                        {item.user?.firstName}
                        &nbsp;
                        {item.user?.lastName}
                      </td>
                      <td className="px-4 py-2 text-gray-900 dark:text-white">
                        {item.user?.email}
                      </td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">
                        {RoleLabel[item.user?.role as Role]}
                      </td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">
                        {item.signedAt ?? (
                          <>
                            {item.user?.id === loginData?.user.id ? (
                              <a
                                className="text-blue-500"
                                href={`/approval-document?id=${data.id}`}
                                target="_blank"
                              >
                                Sign Here
                              </a>
                            ) : (
                              '-'
                            )}
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-3 text-center text-gray-500 dark:text-gray-400"
                    >
                      No approver assigned.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Actions */}
      {loginData?.user.role === 'GA' && data.status !== RequestStatus.REJECT && (
        <div className="flex justify-end mt-8 gap-x-2.5">
          <Button
            onClick={() => handleReject(data.id)}
            className="bg-error-600 hover:bg-error-700 text-white"
          >
            Reject
          </Button>
          {data.status !== RequestStatus.DONE && data.status !== RequestStatus.WAITING_APPROVAL && (
            <Button
              onClick={() => handleProcess(data, isEdit)}
              disabled={
                isLoading ||
                (data.submissionType === 'PROCUREMENT' &&
                  data.status === 'DRAFT' &&
                  data.assets.length > 0 &&
                  data.signatures.length > 0 &&
                  !reviewedSig?.data?.isReviewed)
              }
            >
              Process
            </Button>
          )}
        </div>
      )}
    </>
  );
};

const DetailItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) => (
  <div>
    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</p>
    <p className="text-base font-semibold text-gray-900 dark:text-white">{value ?? '-'}</p>
  </div>
);

export default Detail;
