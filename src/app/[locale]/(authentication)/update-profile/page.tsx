import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import FormUpdateProfileFeature from '@/features/profile/Form';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Update Profile | TailAdmin',
  description: 'Update your profile information.',
};

const UpdateProfilePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user.isActive) {
    redirect('/change-password');
  }

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <FormUpdateProfileFeature />
      </div>
    </div>
  );
};

export default UpdateProfilePage;
