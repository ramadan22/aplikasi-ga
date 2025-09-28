export type Data = {
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
