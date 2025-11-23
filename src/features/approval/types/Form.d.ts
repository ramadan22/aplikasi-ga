import { RequestStatus, SubmissionType } from '@/constants/Approval';

export type DefaultEnumType<T> = {
  value: T;
  label: string;
};

export type OptionForm = {
  label: string;
  value: string;
};

export interface ParamsForm {
  id?: string;
  submissionType: DefaultEnumType<SubmissionType> | null;
  status: RequestStatus | null;
  notes: string;
  requestedFor: DefaultEnumType<string> | null;
  assetRequest: {
    idx: string;
    sn?: string;
    quantity?: number;
    name: string;
    category: CommonTextAndValue | null;
  }[];
  approvedBy: Option[];
}

export type PropsForm = {
  id: string;
  data: Data | undefined;
  process?: RequestStatus | '';
  handleSuccess: (value: boolean) => void;
  handleModal: (value: boolean) => void;
};
