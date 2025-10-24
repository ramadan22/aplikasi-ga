import { Data } from '@/services/upload/type';

export type Props = {
  id: string;
  value: string;
  type: string;
  usage: string;
  handleChange: (data: Data | null) => void;
  error?: boolean;
  hint?: string;
};
