import { Role } from '@/constants/Role';

type IDataDetail = {
  id?: string;
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
  role: Role | null;
  socialMedia: string[];
  image?: string;
  imageId?: string;
};

export type IProfileImage = {
  id: string;
  url: string;
} | null;

type IForm = {
  firstName: string;
  lastName: string;
  phone: string;
  image: IProfileImage;
};

export interface PropsDetail {
  data: IDataDetail;
  userId?: string;
  loading: boolean;
  handleReset?: () => void;
  handleEdit?: () => void;
  handleChangePassword?: () => void;
}
