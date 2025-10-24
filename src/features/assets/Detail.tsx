import Button from '@/ui/components/simple/button/Button';
import { format } from 'date-fns';
import Image from 'next/image';
import { DataAssetsByName } from './types';

interface DetailProps {
  onClose: () => void;
  data: DataAssetsByName | null;
}

const Detail = ({ onClose, data }: DetailProps) => {
  if (!data) return null;

  return (
    <>
      <div>
        <h5 className="mb-2 font-semibold text-gray-800 dark:text-white/90 text-xl lg:text-2xl">
          Asset Detail
        </h5>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          View complete information of selected asset.
        </p>
      </div>

      <div className="mt-8 space-y-4">
        {/* Image */}
        <div className="flex justify-center">
          {data.image ? (
            <Image
              src={data.image}
              alt={data.name}
              width={200}
              height={200}
              className="object-cover rounded-xl border border-gray-200 dark:border-gray-700"
            />
          ) : (
            <div className="w-[200px] h-[200px] flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 text-sm dark:border-gray-700">
              No Image
            </div>
          )}
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <DetailItem label="Name" value={data.name} />
          <DetailItem label="Code" value={data.code} />
          <DetailItem label="Serial Number" value={data.serialNumber} />
          <DetailItem label="Maintenance" value={data.isMaintenance ? 'Yes' : 'No'} />
          <DetailItem label="Category" value={data.category?.name} />
          <DetailItem
            label="Created At"
            value={format(new Date(data.createdAt), 'dd MMM yyyy, HH:mm')}
          />
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <Button
          onClick={onClose}
          className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
        >
          Close
        </Button>
      </div>
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
