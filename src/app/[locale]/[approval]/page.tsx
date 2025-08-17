import ApprovalDocument from '@/features/approval';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template',
  description: 'This is Next.js Home for TailAdmin Dashboard Template',
};

const ApprovalPage = async () => (
  <div className="flex justify-center">
    <ApprovalDocument />
  </div>
);

export default ApprovalPage;
