'use client';

import React, { ReactElement, Suspense } from 'react';

import { SessionLoader } from '@/lib/next-auth/SessionLoader';
import { useSidebarStore } from '@/lib/zustand/SidebarStore';
import AppHeader from '@/ui/layouts/AppHeader';
import AppSidebar from '@/ui/layouts/AppSidebar';
import Backdrop from '@/ui/layouts/Backdrop';
import Loading from './loading';

const MainLayout = ({ children }: { children: React.ReactNode }): ReactElement => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebarStore();

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? 'ml-0'
    : isExpanded || isHovered
      ? 'lg:ml-[290px]'
      : 'lg:ml-[90px]';

  return (
    <>
      <SessionLoader />
      <div className="min-h-screen flex flex-row items-stretch">
        {/* Sidebar and Backdrop */}
        <AppSidebar />
        <Backdrop />
        {/* Main Content Area */}
        <div
          className={`flex-1 relative transition-all duration-300 ease-in-out ${mainContentMargin}`}
        >
          <div className="absolute w-full h-full inset-0 flex flex-col">
            {/* Header */}
            <AppHeader />
            {/* Page Content */}
            <div className="flex-1 p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6 relative w-full h-full">
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
