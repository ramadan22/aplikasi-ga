import { IAssetByName } from '@/services/asset/types';

export type FormOption = {
  label: string;
  value: string;
};

export type FormParams = {
  id?: string;
  name: string;
  categoryId: string;
  image: string;
  isMaintenance: boolean;
  serialNumber: string;
  category: FormOption | null;
};

export type FormProps = {
  id: string;
  data: IAssetByName | undefined;
  handleSuccess: (value: boolean) => void;
  handleModal: (value: boolean) => void;
};
