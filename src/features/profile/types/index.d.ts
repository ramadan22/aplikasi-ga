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
};

export interface PropsDetail {
  data: IDataDetail;
  userId?: string;
  loading: boolean;
  handleReset?: () => void;
  handleEdit?: () => void;
  handleChangePassword?: () => void;
}
