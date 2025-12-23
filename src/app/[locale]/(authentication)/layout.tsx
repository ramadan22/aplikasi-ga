import NextAuthProvider from '@/lib/providers/NextAuthProvider';
import { ThemeProvider } from '@/lib/zustand/ThemeStore';
import GridShape from '@/ui/components/common/GridShape';
import ThemeTogglerTwo from '@/ui/components/common/ThemeTogglerTwo';
import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextAuthProvider>
      <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
        <ThemeProvider>
          <div className="relative flex min-h-screen">
            <div className="relative flex lg:flex-row flex-col lg:w-1/2 w-full dark:bg-gray-900 py-10">
              {children}
            </div>
            <div className="lg:w-1/2 w-full bg-brand-950 dark:bg-white/5 lg:grid items-center hidden">
              <div className="relative items-center justify-center flex z-1">
                {/* <!-- ===== Common Grid Shape Start ===== --> */}
                <GridShape />
                <div className="flex flex-col items-center max-w-xs">
                  {/* <Link href="/" className="block mb-4">
                    <Image width={231} height={48} src="./images/logo/auth-logo.svg" alt="Logo" />
                  </Link> */}
                  <p className="text-center text-gray-400 dark:text-white/60">
                    A General Affair dashboard for managing facilities, assets, and daily
                    operations.
                  </p>
                </div>
              </div>
            </div>
            <div className="fixed bottom-6 right-6 z-50 hidden sm:block">
              <ThemeTogglerTwo />
            </div>
          </div>
        </ThemeProvider>
      </div>
    </NextAuthProvider>
  );
};

export default AuthLayout;
