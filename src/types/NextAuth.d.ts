// types/next-auth.d.ts
import { AuthTypes, ProfileTypes } from '@/services/authentication/authenticationTypes';
import { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User extends DefaultUser, Partial<AuthTypes>, Partial<ProfileTypes> {}

  interface Session extends DefaultSession {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT, Partial<AuthTypes>, Partial<ProfileTypes> {}
}
