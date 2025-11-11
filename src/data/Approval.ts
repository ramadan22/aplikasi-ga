import { SubmissionType, SubmissionTypeLabel } from '@/constants/Approval';

export const SubmissionTypes = Object.values(SubmissionType).map(value => ({
  value,
  label: SubmissionTypeLabel[value],
}));
