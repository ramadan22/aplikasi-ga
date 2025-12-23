import { IUser, IUserRegister } from '@/services/users/types';
import { PaginationParams } from '@/types/ResponseApi';

export type Props = {
  params: PaginationParams;
};

export type DataUsers = IUser;
export type DataUsersRegister = IUserRegister;
