import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { defaultParams } from '@/data/Table';
import ApprovalFeature from '@/features/approval';
import { get, queries } from '@/services/approval';
import ComponentCard from '@/ui/components/common/ComponentCard';
import PageBreadcrumb from '@/ui/components/common/PageBreadCrumb';
import { buildQueryUrl } from '@/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Management Approval',
  description: 'This is Management Approval for Dashboard',
};

const ApprovalPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const header = await headers();
  const pathname = header.get('x-pathname') || '';

  if (params?.page === undefined || params?.limit === undefined) {
    const url = buildQueryUrl(pathname, { page: defaultParams.page, limit: defaultParams.size });
    redirect(url);
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [queries.GET_APPROVALS, params],
    queryFn: () => get(params),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <PageBreadcrumb
          pageTitle="Approvals Data"
          breadCrumbs={[{ text: 'Approvals Data', url: '' }]}
        />
        <div className="space-y-6">
          <ComponentCard>
            <ApprovalFeature params={params} />
          </ComponentCard>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default ApprovalPage;
