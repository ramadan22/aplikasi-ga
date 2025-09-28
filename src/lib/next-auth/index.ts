import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';

export const getSessionAuth = async () => {
  if (typeof window === 'undefined') {
    return getServerSession(authOptions);
  }
  return getSession();
};
