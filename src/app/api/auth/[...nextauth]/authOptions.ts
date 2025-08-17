import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { authLogin, getProfile } from '@/services/authentication';
import { TokenData } from '@/services/authentication/authenticationTypes';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        username: { label: 'username', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials): Promise<User> {
        try {
          const resultAuth = await authLogin({
            username: credentials?.username || '',
            password: credentials?.password || '',
          });

          if (resultAuth.status !== 200) {
            throw new Error(resultAuth.message || 'Something wrong!');
          }

          const getProfileResult = await getProfile(resultAuth?.data?.accessToken || '');

          return {
            id: getProfileResult?.data?.guid || '',
            accessToken: resultAuth?.data?.accessToken,
            refreshToken: resultAuth?.data?.refreshToken,
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
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };
      return token;
    },
    async session({ session, token }) {
      const tokenData = token as TokenData;

      session.user = {
        ...session.user,
        ...tokenData,
      };

      return session;
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      return url.startsWith(baseUrl) ? Promise.resolve(url) : Promise.resolve(baseUrl);
    },
  },
};
