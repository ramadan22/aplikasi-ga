import ApprovalDocument from '@/features/approval/approvalDocument';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'General Affairs Administration',
  description: 'Internal administration interface for managing GA modules and services.',
};

const ApprovalPage = async () => (
  <div className="flex justify-center">
    <ApprovalDocument />
  </div>
);

export default ApprovalPage;
