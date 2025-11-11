import { Role } from '@/constants/Role';
import { PaginationParams, ResponseApiTypes } from '@/types/ResponseApi';

export type Data = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string | null;
  socialMedia: [];
  role: Role;
  isActive: boolean;
  updatedAt: string | null;
  createdAt: string;
};

export type GetParams = { exceptUserId?: string } & PaginationParams;
export type GetResponse = ResponseApiTypes<Data[]>;
