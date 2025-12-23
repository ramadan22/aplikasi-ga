'use client';

import { useUpdateProfile } from '@/lib/zustand/UpdateProfileStore';
import { useRouter } from 'next/navigation';
import { Get } from './hooks/UseProfile';
import { IDataDetail } from './types';
import UserInfoCard from './UserInfoCard';
import UserMetaCard from './UserMetaCard';

interface Props {
  userId?: string;
  handleReset?: () => void;
}

const UserProfileFeature = ({ userId, handleReset }: Props) => {
  const router = useRouter();
  const { setUpdate } = useUpdateProfile();

  const { data: profile, isLoading } = Get({ id: userId });

  return (
    <>
      <UserMetaCard
        handleReset={handleReset}
        handleChangePassword={() => router.push('/change-password?isFromProfilePage=1')}
        handleEdit={() => {
          setUpdate();
          router.push('/update-profile');
        }}
        userId={userId}
        loading={isLoading}
        data={profile?.data as IDataDetail}
      />
      <UserInfoCard loading={isLoading} data={profile?.data as IDataDetail} />
    </>
  );
};

export default UserProfileFeature;
