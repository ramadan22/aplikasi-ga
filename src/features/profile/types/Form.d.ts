import { IUser } from '@/services/users/types';

export type FormParams = IUser;

export type PropsForm = {
  id?: string;
  data?: IUser | undefined;
  handleSuccess?: (value: boolean) => void;
  handleModal?: (value: boolean) => void;
};
