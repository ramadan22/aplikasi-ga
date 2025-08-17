'use client';

import React, { useEffect } from 'react';
import { create } from 'zustand';

type SidebarState = {
  isExpanded: boolean;
  isMobileOpen: boolean;
  isMobile: boolean;
  isHovered: boolean;
  activeItem: string | null;
  openSubmenu: string | null;
  setIsMobile: (_value: boolean) => void;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  setIsHovered: (_isHovered: boolean) => void;
  setActiveItem: (_item: string | null) => void;
  toggleSubmenu: (_item: string) => void;
  resetMobileSidebar: () => void;
};

export const useSidebarStore = create<SidebarState>((set, get) => ({
  isExpanded: true,
  isMobileOpen: false,
  isMobile: false,
  isHovered: false,
  activeItem: null,
  openSubmenu: null,

  setIsMobile: value =>
    set(() => ({
      isMobile: value,
      isMobileOpen: value ? get().isMobileOpen : false,
    })),

  toggleSidebar: () => set(state => ({ isExpanded: !state.isExpanded })),

  toggleMobileSidebar: () => set(state => ({ isMobileOpen: !state.isMobileOpen })),

  setIsHovered: isHovered => set({ isHovered }),

  setActiveItem: item => set({ activeItem: item }),

  toggleSubmenu: item =>
    set(state => ({
      openSubmenu: state.openSubmenu === item ? null : item,
    })),

  resetMobileSidebar: () => set({ isMobileOpen: false }),
}));

const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const setIsMobile = useSidebarStore(state => state.setIsMobile);

  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth < 768;
      setIsMobile(isNowMobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [setIsMobile]);

  return children;
};

export default SidebarProvider;
