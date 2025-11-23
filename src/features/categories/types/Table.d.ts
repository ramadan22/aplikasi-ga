type Action = 'add' | 'delete' | 'edit' | 'detail' | '';

export type TableAction<T = object> = {
  id?: string;
  type: Action;
  data?: T;
};
