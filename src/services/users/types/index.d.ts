import { Role } from '@/constants/Role';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  isActive: boolean;
  socialMedia: string[];
  role: Role;
  updatedAt: string | null;
  createdAt: string;
}

export interface IUserRegister {
  plainPassword: string;
  email: string;
  firstName: string;
  id: string;
  role: Role;
  isActive: boolean;
  updatedAt: Date;
  createdAt: Date;
}
