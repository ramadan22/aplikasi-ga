import { ICategory } from '@/services/category/types';

export type FormParams = ICategory;

export type PropsForm = {
  id: string;
  data: ICategory | undefined;
  handleSuccess: (value: boolean) => void;
  handleModal: (value: boolean) => void;
};
