import { Role } from '@/constants/Role';
import { MutationConfig } from '@/types/Mutation';
import { ResponseApiTypes } from '@/types/ResponseApi';
import { IUser, IUserRegister } from '.';

/**
 * Get users types
 */
export type GetParams = PaginationParams & {};
export type GetResponse = ResponseApiTypes<IUser[]>;

/**
 * Post users types
 */
interface IPostParams {
  firstName: string;
  email: string;
  role: Role;
}

export type PostMutationOptions = MutationConfig<IUserRegister, IPostParams>;
export type IPostResponse = ResponseApiTypes<IUserRegister>;

/**
 * Post users types
 */
interface IPutParams {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  imageId: string;
  // phoneNumber: string;
  socialMedia: string[];
}

export type PutMutationOptions = MutationConfig<IUser, IPutParams>;
export type IPutResponse = ResponseApiTypes<IUser>;
