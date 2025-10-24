import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { authLogin } from '@/services/authentication';
import { getProfile } from '@/services/users';
import { removeObjectKeys } from '@/utils';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials): Promise<User> {
        try {
          const resultAuth = await authLogin({
            email: credentials?.email || '',
            password: credentials?.password || '',
          });

          if (resultAuth.status !== 200) {
            throw new Error(resultAuth.message || 'Something wrong!');
          }

          const getProfileResult = await getProfile(resultAuth.data?.accessToken);

          return {
            id: getProfileResult?.data?.id || '',
            accessToken: resultAuth.data?.accessToken || '',
            refreshToken: resultAuth.data?.refreshToken || '',
            ...getProfileResult?.data,
          };
        } catch (error) {
          const message = (error as { message?: string })?.message;
          throw new Error(message);
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn() {
      return true;
    },
    async jwt({ user, token, session, trigger }) {
      if (user) token = { ...token, ...user };
      if (trigger === 'update') token = { ...token, ...session };

      return token;
    },
    async session({ session, token }) {
      session.user = removeObjectKeys({ ...session.user, ...token }, [
        'accessToken',
        'refreshToken',
      ]);

      return session;
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      return url.startsWith(baseUrl) ? Promise.resolve(url) : Promise.resolve(baseUrl);
    },
  },
};
