import { create } from 'zustand';

type SessionState = {
  loading: boolean;
  setLoading: (val: boolean) => void;
};

export const useSessionStore = create<SessionState>(set => ({
  loading: false,
  setLoading: val => set({ loading: val }),
}));
