'use client';

import { PropsDetail } from './types';

const UserInfoCard = ({ data, loading }: PropsDetail) => (
  <div className="p-5 border border-gray-200 md:bg-transparent dark:md:bg-transparent bg-white dark:bg-white/[0.03] rounded-2xl dark:border-gray-800 lg:p-6">
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
          Personal Information
        </h4>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
          <div>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              First Name
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {loading && (
                <span className="block animate-pulse bg-gray-200 dark:bg-gray-200/2 w-[150px] h-[20px] rounded" />
              )}
              {!loading && (data?.firstName || '-')}
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Last Name
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {loading && (
                <span className="block animate-pulse bg-gray-200 dark:bg-gray-200/2 w-[150px] h-[20px] rounded" />
              )}
              {!loading && (data?.lastName || '-')}
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Email address
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {loading && (
                <span className="block animate-pulse bg-gray-200 dark:bg-gray-200/2 w-[150px] h-[20px] rounded" />
              )}
              {!loading && (data?.email || '-')}
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Phone</p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {loading && (
                <span className="block animate-pulse bg-gray-200 dark:bg-gray-200/2 w-[150px] h-[20px] rounded" />
              )}
              {!loading && (data?.phone || '-')}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default UserInfoCard;
