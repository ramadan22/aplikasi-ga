import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import FormUpdateProfileFeature from '@/features/profile/Form';
import { getProfile, queries } from '@/services/users';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'General Affairs Administration',
  description: 'Internal administration interface for managing GA modules and services.',
};

const UpdateProfilePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.isActive) {
    redirect('/change-password');
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [queries.GET_PROFILE],
    queryFn: () => getProfile(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col flex-1 lg:w-1/2 w-full">
        <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
          <FormUpdateProfileFeature />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default UpdateProfilePage;
