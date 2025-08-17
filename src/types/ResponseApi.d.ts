/* eslint-disable @typescript-eslint/no-explicit-any */

export type PaginationParams = {
  page?: number;
  limit?: number;
  keyword?: string;
};

export type PaginationSorterTypes = {
  page: number;
  size: number;
  total?: number;
  totalPage?: number;
};

export type ListTypes<T = any> = T extends undefined ? never : T;

export type ResponseApiTypes<T = any> = {
  success: boolean;
  status: number;
  message: string;
  data?: ListTypes<T>;
  meta?: PaginationSorterTypes;
};
