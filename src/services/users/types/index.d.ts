import { Role } from '@/constants/Role';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  image: string;
  isActive: boolean;
  socialMedia: string[];
  role: Role;
  teamLead: string | null;
  updatedAt: string | null;
  createdAt: string;
}
