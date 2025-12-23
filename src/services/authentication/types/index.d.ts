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
};

export type IChangePassword = {
  oldPassword?: string;
  newPassword: string;
  confirmPassword: string;
};
