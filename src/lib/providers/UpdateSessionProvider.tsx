'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useSessionStore } from '../zustand/SessionStore';

type Props = {
  children?: React.ReactNode;
};

const UpdateSessionProvider = ({ children }: Props) => {
  const { valueSessionToken, valueSession, updateValueSession, updateSessionToken } =
    useSessionStore();
  const { update } = useSession();

  useEffect(() => {
    console.log('here');
    if (valueSession) {
      console.log('valueSession', valueSession);
      update({ isActive: valueSession.isActive });
      updateValueSession(null);
    }
  }, [valueSession]);

  useEffect(() => {
    if (valueSessionToken) {
      update({ accessToken: valueSessionToken });
      updateSessionToken('');
    }
  }, [valueSessionToken]);

  return <>{children}</>;
};

export default UpdateSessionProvider;
