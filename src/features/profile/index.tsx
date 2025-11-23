'use client';

import { Get } from './hooks/UseProfile';
import UserAddressCard from './UserAddressCard';
import UserInfoCard from './UserInfoCard';
import UserMetaCard from './UserMetaCard';

const UserProfileFeature = () => {
  const { data: _ } = Get();

  return (
    <>
      <UserMetaCard />
      <UserInfoCard />
      <UserAddressCard />
    </>
  );
};

export default UserProfileFeature;
