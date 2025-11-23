import { Role } from '@/constants/Role';

// export type PayloadsTypes = {
//   email: string;
//   password: string;
// };

// export type LoginResponseTypes = {
//   accessToken: string;
//   refreshToken?: string;
// };

export type IProfile = {
  firstName: string;
  lastName: string;
  isActive: boolean;
  socialMedia: string[];
  role: Role;
  teamLead: string | null;
  updatedAt: string | null;
  createdAt: string;
};

export type IChangePassword = {
  oldPassword?: string;
  newPassword: string;
  confirmPassword: string;
};
