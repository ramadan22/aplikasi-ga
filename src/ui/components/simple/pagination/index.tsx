/* eslint-disable react/jsx-one-expression-per-line */
'use client';

import { useEffect, useState } from 'react';

import { rowsPerPage } from '@/data/Table';
import Button from '../button/Button';
import Label from '../form/Label';
import Select from '../form/Select';

type PaginationProps = {
  count: number;
  page?: number;
  perPage?: number;
  onPageChange?: (page: number) => void;
  onPerPageChange?: (perPage: number) => void;
};

const Pagination = ({
  count,
  page: pageProp = 1,
  perPage: perPageProp = 10,
  onPageChange,
  onPerPageChange,
}: PaginationProps) => {
  const [perPage, setPerPage] = useState(perPageProp);
  const [page, setPage] = useState(pageProp);

  const totalPageCount = Math.ceil(count / perPage);

  useEffect(() => {
    if (onPageChange) {
      onPageChange(page);
    }
  }, [page]);

  useEffect(() => {
    if (onPerPageChange) {
      onPerPageChange(Number(perPage));
    }
  }, [perPage]);

  return (
    <div className="flex items-center sm:flex-nowrap flex-wrap justify-between px-2 pb-2.5">
      <div>
        <Label className="text-sm font-medium text-black/50">
          Total data:&nbsp;
          {!Number.isNaN(count) ? count : 0}
        </Label>
      </div>
      <div className="flex gap-4 items-center space-x-6 lg:space-x-8 whitespace-nowrap sm:flex-nowrap flex-wrap">
        <div className="flex items-center space-x-2">
          <Label className="text-sm font-medium text-black/50 mb-0">Rows per page</Label>
          <div className="relative">
            <Select
              className="w-auto h-[30px] p-0 pl-2 pr-5 text-xs"
              iconClassName="mr-2"
              placeholder=""
              defaultValue={perPage}
              onChange={value => setPerPage(Number(value))}
              options={rowsPerPage}
            />
          </div>
        </div>
        <div className="flex items-center justify-center text-sm font-medium dark:text-gray-400 text-black/50">
          Page {page} of {!Number.isNaN(totalPageCount) ? totalPageCount : 0}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            size="xs"
            // variant="outline"
            onClick={() => setPage(1)}
            disabled={page === 1}
          >
            <span className="sr-only">Go to first page</span>
            first
          </Button>
          <Button
            size="xs"
            // variant="outline"
            onClick={() => page > 1 && setPage(pagePayload => pagePayload - 1)}
            disabled={page === 1}
          >
            prev
          </Button>
          <Button
            size="xs"
            // variant="outline"
            onClick={() => page < totalPageCount && setPage(pagePayload => pagePayload + 1)}
            disabled={totalPageCount === 0 || (totalPageCount !== 0 && page === totalPageCount)}
          >
            next
          </Button>
          <Button
            size="xs"
            // variant="outline"
            onClick={() => page < totalPageCount && setPage(totalPageCount)}
            disabled={totalPageCount === 0 || (totalPageCount !== 0 && page === totalPageCount)}
          >
            last
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
