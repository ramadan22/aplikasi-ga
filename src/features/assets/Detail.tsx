import { format } from 'date-fns';
import Image from 'next/image';
import { ReactNode } from 'react';
import { DataAssetsByName } from './types';

interface DetailProps {
  data: DataAssetsByName | null;
}

const Detail = ({ data }: DetailProps) => {
  if (!data) return null;

  return (
    <>
      {/* Header */}
      <div className="animate-fadeIn">
        <h5 className="mb-1 font-semibold text-gray-900 dark:text-white text-xl lg:text-2xl tracking-tight">
          Asset Detail
        </h5>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          View complete information of selected asset.
        </p>
      </div>

      <div className="mt-8 space-y-8 animate-fadeIn">
        {/* Asset Preview */}
        <SectionCard>
          <div className="flex justify-center">
            {data.image ? (
              <div className="rounded-2xl overflow-hidden shadow-md transform transition-all hover:scale-[1.02] hover:shadow-lg">
                <Image
                  src={data.image}
                  alt={data.name}
                  width={260}
                  height={260}
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-[260px] h-[260px] flex items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm shadow-inner">
                No Image
              </div>
            )}
          </div>
        </SectionCard>

        {/* Basic Info */}
        <SectionCard title="Basic Information">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
            <DetailItem label="Name" value={data.name} />
            <DetailItem label="Code" value={data.code} />
            <DetailItem label="Serial Number" value={data.serialNumber} />
            <DetailItem
              label="Maintenance"
              value={
                <span
                  className={`px-2.5 py-1 text-[11px] tracking-wide rounded-full font-semibold ${
                    data.isMaintenance
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {data.isMaintenance ? 'YES' : 'NO'}
                </span>
              }
            />
            <DetailItem label="Category" value={data.category?.name} />
            <DetailItem
              label="Created At"
              value={format(new Date(data.createdAt), 'dd MMM yyyy, HH:mm')}
            />
          </div>
        </SectionCard>
      </div>
    </>
  );
};

/* ✅ Reusable Card Wrapper */
const SectionCard = ({ title, children }: { title?: string; children: React.ReactNode }) => (
  <div className="rounded-2xl p-6 backdrop-blur-md bg-white/60 dark:bg-gray-900/50 shadow-sm border border-gray-100/40 dark:border-gray-800/40">
    {title && (
      <p className="text-[15px] font-semibold text-gray-800 dark:text-white mb-4 tracking-tight">
        {title}
      </p>
    )}
    {children}
  </div>
);

/* ✅ Improved typography & spacing */
const DetailItem = ({ label, value }: { label: string; value: string | number | ReactNode }) => (
  <div className="space-y-[2px]">
    <p className="text-[13px] text-gray-500 dark:text-gray-400">{label}</p>
    <div className="text-[15px] font-semibold text-gray-900 dark:text-gray-100 break-words">
      {value || '-'}
    </div>
  </div>
);

export default Detail;
