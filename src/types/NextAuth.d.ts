// types/next-auth.d.ts
import { ProfileTypes } from '@/services/authentication/types';
import { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  type User = DefaultUser & Partial<ProfileTypes> & { accessToken: string; refreshToken: string };
  interface Session extends DefaultSession {
    user: Partial<User>;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT, ProfileTypes {}
}
