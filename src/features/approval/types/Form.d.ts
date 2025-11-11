import { RequestStatus, SubmissionType } from '@/constants/Approval';

export type DefaultEnumType<T> = {
  value: T;
  label: string;
};

export type Option = {
  label: string;
  value: string;
};

export type FormParams = {
  id?: string;
  submissionType: DefaultEnumType<SubmissionType> | null;
  status: DefaultEnumType<RequestStatus> | null;
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
};

export type FormProps = {
  id: string;
  data: Data | undefined;
  process?: RequestStatus | '';
  handleSuccess: (value: boolean) => void;
  handleModal: (value: boolean) => void;
};
