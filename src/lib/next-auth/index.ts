import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export const getSessionAuth = async () => {
  let session = null;

  if (typeof window !== 'undefined') {
    session = await getSession();
  }

  if (typeof window === 'undefined') {
    session = await getServerSession(authOptions);
  }

  return session;
};
