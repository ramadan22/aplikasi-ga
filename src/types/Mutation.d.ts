import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ResponseApiTypes } from './ResponseApi';

export type MutationConfig<TData, TVariables = void, TError = AxiosError> = UseMutationOptions<
  ResponseApiTypes<TData>,
  TError,
  TVariables
>;
