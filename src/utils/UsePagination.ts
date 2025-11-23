'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { buildQueryUrl } from '.';

interface HandlePaginationParams {
  key: string;
  value: string | number;
}

const UsePagination = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePaginationChange = ({ key, value }: HandlePaginationParams) => {
    const currentPage = searchParams.get('page') || '1';
    const currentLimit = searchParams.get('limit') || '10';

    const newPage = key === 'page' ? String(value) : currentPage;
    const newLimit = key === 'size' ? String(value) : currentLimit;

    const newUrl = buildQueryUrl(pathname, {
      page: newPage,
      limit: newLimit,
    });

    const currentUrl = buildQueryUrl(pathname, {
      page: currentPage,
      limit: currentLimit,
    });

    if (newUrl !== currentUrl) {
      router.push(newUrl);
    }
  };

  return {
    handlePaginationChange,
  };
};

export default UsePagination;
