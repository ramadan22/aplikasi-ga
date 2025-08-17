'use client';

import { useSessionStore } from '@/lib/zustand/SessionStore';
import { getSession } from 'next-auth/react';
import { useEffect } from 'react';

export const SessionLoader = () => {
  const { setLoading } = useSessionStore();

  useEffect(() => {
    const loadSession = async () => {
      setLoading(true);
      await getSession(); // or do something with it
      setLoading(false);
    };

    loadSession();
  }, [setLoading]);

  return null;
};
