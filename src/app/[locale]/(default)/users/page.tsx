import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { defaultParams } from '@/data/Table';
import UsersFeature from '@/features/users';
import { get, queries } from '@/services/users';
import ComponentCard from '@/ui/components/common/ComponentCard';
import PageBreadcrumb from '@/ui/components/common/PageBreadCrumb';
import { buildQueryUrl } from '@/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'General Affairs Administration',
  description: 'Internal administration interface for managing GA modules and services.',
};

const UsersPage = async ({
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
    queryKey: [queries.GET_USERS, params],
    queryFn: () => get(params),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <PageBreadcrumb pageTitle="User Data" breadCrumbs={[{ text: 'User Data', url: '' }]} />
        <div className="space-y-6">
          <ComponentCard>
            <UsersFeature params={params} />
          </ComponentCard>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default UsersPage;
