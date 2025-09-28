export type PayloadsTypes = {
  email: string;
  password: string;
};

export type LoginResponseTypes = {
  accessToken: string;
  refreshToken?: string;
};

export type ProfileTypes = {
  id: string;
  email: string;
  firstName: string;
  lastName: string | null;
  image: string | null;
  role: string;
  socialMedia: string | null;
  accessToken: string;
  refreshToken: string;
  isActive: boolean;
  isManager: boolean;
  manager: string;
  createdAt: string;
  updatedAt: string;
};
