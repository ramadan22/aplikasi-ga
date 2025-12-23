import UserProfileFeature from '@/features/profile';
import { getProfile, queries } from '@/services/users';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'General Affairs Administration',
  description: 'Internal administration interface for managing GA modules and services.',
};

const ProfilePage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [queries.GET_PROFILE],
    queryFn: () => getProfile(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="rounded-2xl md:border border-gray-200 md:bg-white lg:p-6 md:p-5 dark:border-gray-800 dark:md:bg-white/[0.03]">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6 pb-10">
          <UserProfileFeature />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default ProfilePage;
