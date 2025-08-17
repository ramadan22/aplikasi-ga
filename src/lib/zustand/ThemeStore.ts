'use client';

import type React from 'react';
import { useEffect } from 'react';
import { create } from 'zustand';

type Theme = 'light' | 'dark';

type ThemeStore = {
  theme: Theme;
  isInitialized: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: 'light',
  isInitialized: false,
  toggleTheme: () => {
    const newTheme = get().theme === 'light' ? 'dark' : 'light';
    set({ theme: newTheme });

    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
    }
  },
  setTheme: (theme: Theme) => {
    set({ theme });

    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  },
}));

export const useInitTheme = () => {
  const setTheme = useThemeStore(state => state.setTheme);
  const isInitialized = useThemeStore(state => state.isInitialized);

  useEffect(() => {
    if (!isInitialized && typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      const initialTheme = savedTheme || 'light';

      setTheme(initialTheme);
      useThemeStore.setState({ isInitialized: true });
    }
  }, [isInitialized, setTheme]);
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useInitTheme();
  return children;
};
