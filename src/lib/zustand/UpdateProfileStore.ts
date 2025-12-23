import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Store = {
  isFromProfilePage: boolean;
  setUpdate: () => void;
  clear: () => void;
};

export const useUpdateProfile = create<Store>()(
  persist(
    set => ({
      isFromProfilePage: false,
      setUpdate: () => set({ isFromProfilePage: true }),
      clear: () => set({ isFromProfilePage: false }),
    }),
    {
      name: 'update-profile',
    },
  ),
);
