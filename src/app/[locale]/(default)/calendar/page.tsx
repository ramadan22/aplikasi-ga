import Calendar from '@/lib/full-calendar';
import PageBreadcrumb from '@/ui/components/common/PageBreadCrumb';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'General Affairs Administration',
  description: 'Internal administration interface for managing GA modules and services.',
};

export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Calendar" />
      <Calendar />
    </div>
  );
}
