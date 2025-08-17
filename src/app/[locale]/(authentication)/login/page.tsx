import FormLoginFeature from '@/features/authentication/login/form';
import SocialLoginFeature from '@/features/authentication/login/social';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Next.js SignIn Page | TailAdmin - Next.js Dashboard Template',
  description: 'This is Next.js Signin Page TailAdmin Dashboard Template',
};

const LoginPage = () => (
  <div className="flex flex-col flex-1 lg:w-1/2 w-full">
    <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
      <div>
        <div className="mb-5 sm:mb-8">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
            Sign In
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter your email and password to sign in!
          </p>
        </div>
        <div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
            <SocialLoginFeature />
          </div>
          <div className="relative py-3 sm:py-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">
                Or
              </span>
            </div>
          </div>

          <FormLoginFeature />

          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              Don&apos;t have an account?&nbsp;
              <Link
                href="/signup"
                className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default LoginPage;
