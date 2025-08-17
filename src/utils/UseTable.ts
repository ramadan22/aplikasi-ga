'use client';

import { ReadonlyURLSearchParams } from 'next/navigation';
import { buildQueryUrl } from '.';

interface HandlePaginationParams {
  key: string;
  value: string | number;
  searchParams: ReadonlyURLSearchParams;
  pathname: string;
  router: { push: (url: string) => void };
}

export function handlePaginationChange({
  key,
  value,
  searchParams,
  pathname,
  router,
}: HandlePaginationParams) {
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
}
