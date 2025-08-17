import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { defaultParams } from '@/data/Table';
import CategoriesFeature from '@/features/categories';
import { get, queries } from '@/services/category';
import ComponentCard from '@/ui/components/common/ComponentCard';
import PageBreadcrumb from '@/ui/components/common/PageBreadCrumb';
import { buildQueryUrl } from '@/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template',
  description: 'This is Next.js Home for TailAdmin Dashboard Template',
};

const CategoriesPage = async ({
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
    queryKey: [queries.GET_CATEGORIES, params],
    queryFn: () => get(params),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <PageBreadcrumb pageTitle="Categories Data" />
        <div className="space-y-6">
          <ComponentCard>
            <CategoriesFeature params={params} />
          </ComponentCard>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default CategoriesPage;
