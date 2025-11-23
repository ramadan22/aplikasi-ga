export interface Category {
  id: string;
  name: string;
  prefix: string;
  isDevice: boolean;
}

export interface IAsset {
  id: string;
  name: string;
  code: string;
  isMaintenance: boolean;
  serialNumber: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  category: Category;
  quantity: number;
}

export interface IAssetByName {
  id: string;
  name: string;
  code: string;
  isMaintenance: boolean;
  serialNumber: string;
  image: string | null;
  createdAt: string;
  updatedAt: string | null;
  category: Category;
}
