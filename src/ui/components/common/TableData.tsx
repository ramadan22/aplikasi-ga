/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { PaginationSorterTypes } from '@/types/ResponseApi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaEye, FaRegEdit, FaRegTrashAlt, FaSearch } from 'react-icons/fa';
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
import useDebounce from '@/utils/InputDebounce';
import { useEffect, useState } from 'react';
import Input from '../simple/form/input/InputField';
import Pagination from '../simple/pagination';

export type TableHeaderField = {
  key: string;
  header: string;
  render?: (value: any) => React.ReactNode;
};

export type PropsTypes<T = object> = {
  isButtonDetail?: boolean;
  isButtonDelete?: boolean;
  isButtonEdit?: boolean;
  isButtonAdd?: boolean;
  headers: TableHeaderField[] | [];
  data: any[] | undefined;
  isLoading?: boolean;
  handleChangeParams?: (key: string, value: string | number) => void;
  handleButtonAdd?: () => void;
  meta?: PaginationSorterTypes;
  handleButtonAction?: (
    value: 'add' | 'edit' | 'delete' | 'detail' | null,
    id?: string,
    data?: T,
  ) => void;
};

const TableDataUI = <T,>({
  isButtonDetail,
  isButtonDelete = true,
  isButtonEdit = true,
  isButtonAdd = true,
  headers,
  data,
  meta,
  isLoading,
  handleButtonAction,
  handleChangeParams,
}: PropsTypes<T>) => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (handleChangeParams) handleChangeParams('search', debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className="w-full overflow-hidden">
      <div className="flex items-center justify-between mb-5 gap-x-5">
        <div className="flex-1 flex items-center gap-x-5">
          <div className="relative sm:w-1/3 w-full">
            <Input
              placeholder="Type Input Search"
              size="sm"
              type="text"
              className="sm:pl-[62px] pl-[40px]"
              onChange={e => setSearch(e.target.value)}
            />
            <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 sm:px-3.5 px-2 sm:py-3 py-1.5 text-gray-500 dark:border-gray-800 dark:text-gray-400">
              <FaSearch />
            </span>
          </div>
        </div>
        {isButtonAdd && (
          <Button
            size="xs"
            onClick={() => {
              if (handleButtonAction) handleButtonAction('add');
            }}
          >
            Add Data
          </Button>
        )}
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
                        {isButtonDetail && (
                          <Button
                            className="p-2.5 bg-warning-500 dark:bg-warning-500/15"
                            onClick={() => {
                              const id =
                                item[`${headers.find(item2 => item2.header === 'ID')?.key}`] ||
                                null;
                              if (handleButtonAction) handleButtonAction('detail', id, item);
                            }}
                          >
                            <FaEye size={12} />
                          </Button>
                        )}
                        {isButtonEdit && (
                          <Button
                            className="p-2.5 bg-brand-500 dark:bg-brand-500/15"
                            onClick={() => {
                              const id =
                                item[`${headers.find(item2 => item2.header === 'ID')?.key}`] ||
                                null;
                              if (handleButtonAction) handleButtonAction('edit', id, item);
                            }}
                          >
                            <FaRegEdit size={12} />
                          </Button>
                        )}
                        {isButtonDelete && (
                          <Button
                            className="p-2.5 bg-error-500 dark:bg-error-500/15"
                            onClick={() => {
                              const id =
                                item[`${headers.find(item2 => item2.header === 'ID')?.key}`] ||
                                null;
                              if (handleButtonAction) handleButtonAction('delete', id, item);
                            }}
                          >
                            <FaRegTrashAlt size={12} />
                          </Button>
                        )}
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
              <AiOutlineLoading3Quarters
                size={40}
                className="mx-auto animate-spin text-[#624de3]"
              />
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
};

export default TableDataUI;
