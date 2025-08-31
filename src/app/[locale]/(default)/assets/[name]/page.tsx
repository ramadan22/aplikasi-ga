import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { defaultParams } from '@/data/Table';
import AssetsFeature from '@/features/assets/AssetByNameFeature';
import { getByName, queries } from '@/services/asset';
import ComponentCard from '@/ui/components/common/ComponentCard';
import PageBreadcrumb from '@/ui/components/common/PageBreadCrumb';
import { buildQueryUrl } from '@/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template',
  description: 'This is Next.js Home for TailAdmin Dashboard Template',
};

const AssetsPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { name } = await params;
  const query = await searchParams;
  const header = await headers();
  const pathname = header.get('x-pathname') || '';

  if (query?.page === undefined || query?.limit === undefined) {
    const url = buildQueryUrl(pathname, { page: defaultParams.page, limit: defaultParams.size });
    redirect(url);
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [queries.GET_ASSETS_BY_NAME, { ...query, name }],
    queryFn: () => getByName({ ...query, name }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <PageBreadcrumb
          pageTitle={`Assets Data ${decodeURIComponent(name)}`}
          breadCrumbs={[
            { text: 'Assets Data', url: '/assets' },
            { text: decodeURIComponent(name), url: '' },
          ]}
        />
        <div className="space-y-6">
          <ComponentCard>
            <AssetsFeature params={query} />
          </ComponentCard>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default AssetsPage;
