/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { PaginationSorterTypes } from '@/types/ResponseApi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { GrTableAdd } from 'react-icons/gr';

import Button from '@/ui/components/simple/button/Button';
import Label from '@/ui/components/simple/form/Label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui/components/simple/table';
import Pagination from '../simple/pagination';

export type TableHeaderField = {
  key: string;
  header: string;
  render?: (value: any) => React.ReactNode;
};

export type PropsTypes = {
  headers: TableHeaderField[] | [];
  data: any[] | undefined;
  isLoading?: boolean;
  handleChangeParams?: (key: string, value: string | number) => void;
  handleButtonAdd?: () => void;
  meta?: PaginationSorterTypes;
  handleButtonAction?: (
    value: 'add' | 'edit' | 'delete' | null,
    id: string | number | null,
    data?: object,
  ) => void;
};

const TableDataUI = ({
  headers,
  data,
  meta,
  isLoading,
  handleButtonAction,
  handleChangeParams,
}: PropsTypes) => (
  <div className="w-full overflow-hidden">
    <div className="flex items-center justify-between pb-4">
      <div className="relative flex-1 pr-5" />
      <Button
        size="xs"
        onClick={() => {
          if (handleButtonAction) handleButtonAction('add', null);
        }}
      >
        Add Data
      </Button>
    </div>

    <div className="max-w-full overflow-x-auto">
      <div className="min-w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="p-4 text-start text-theme-xs text-gray-500 dark:text-gray-400 w-[60px]">
                No
              </TableHead>
              {headers
                .filter(item => item.header !== 'ID')
                .map(item => (
                  <TableHead
                    key={item.key}
                    className="p-4 text-start text-theme-xs text-gray-500 dark:text-gray-400"
                  >
                    {item.header}
                  </TableHead>
                ))}
              <TableHead className="p-4 text-center text-theme-xs text-gray-500 dark:text-gray-400 w-[100px] sticky right-0 900 z-[1] bg-white dark:bg-[#171f2e]">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {!isLoading &&
              (data?.length || 0) > 0 &&
              data?.map((item, idx: number) => (
                <TableRow key={idx} className="hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                  <TableCell className="p-4 text-start text-theme-sm text-gray-700 dark:text-white w-[60px]">
                    {((meta?.page || 0) - 1) * (meta?.size || 0) + idx + 1}
                  </TableCell>
                  {headers
                    .filter(item2 => item2.header !== 'ID')
                    .map((item2, idx2) => (
                      <TableCell
                        key={idx2}
                        className="p-4 text-start text-theme-sm text-gray-700 dark:text-white"
                      >
                        {item2.render
                          ? item2.render(item[item2.key])
                          : String(item[item2.key as string] ?? '')}
                      </TableCell>
                    ))}
                  <TableCell className="p-4 text-center text-theme-sm w-[100px] sticky right-0 z-[1] bg-white dark:bg-[#171f2e]">
                    <div className="flex items-center justify-center gap-x-2">
                      <Button
                        className="p-2.5"
                        onClick={() => {
                          const id =
                            item[`${headers.find(item2 => item2.header === 'ID')?.key}`] || null;
                          if (handleButtonAction) handleButtonAction('edit', id, item);
                        }}
                      >
                        <FaRegEdit size={12} />
                      </Button>
                      <Button
                        className="p-2.5 bg-error-500 dark:bg-error-500/15"
                        onClick={() => {
                          const id =
                            item[`${headers.find(item2 => item2.header === 'ID')?.key}`] || null;
                          if (handleButtonAction) handleButtonAction('delete', id, item);
                        }}
                      >
                        <FaRegTrashAlt size={12} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {!isLoading && (data?.length || 0) <= 0 && (
          <div className="py-10 text-center text-gray-400 dark:text-white/50">
            <div className="flex flex-col items-center gap-y-5">
              <GrTableAdd size={40} />
              <Label className="text-theme-sm">Add data to see content</Label>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="py-10 text-center">
            <AiOutlineLoading3Quarters size={40} className="mx-auto animate-spin text-[#624de3]" />
          </div>
        )}
      </div>
    </div>

    <div className="mt-6 px-2.5">
      <Pagination
        count={meta?.total || 0}
        page={meta?.page}
        perPage={meta?.size}
        onPerPageChange={size => {
          if (handleChangeParams) handleChangeParams('size', size);
        }}
        onPageChange={page => {
          if (handleChangeParams) handleChangeParams('page', page);
        }}
      />
    </div>
  </div>
);

export default TableDataUI;
