import { IUser } from '@/services/users/types';

export type FormOption = {
  label: string;
  value: string;
};

export type FormParams = {
  id?: string;
  firstName: string;
  email: string;
  role: FormOption | null;
};

export type FormProps = {
  id: string;
  data: IUser | undefined;
  handleSuccess: (value: boolean, data?: unknown) => void;
  handleModal: (value: boolean) => void;
};
