import { IProfile } from '@/services/authentication/types';
import { create } from 'zustand';

type SessionState = {
  loading: boolean;
  valueSession: IProfile | null;
  valueSessionToken: string;
  setLoading: (val: boolean) => void;
  updateValueSession: (val: IProfile | null) => void;
  updateSessionToken: (val: string) => void;
};

export const useSessionStore = create<SessionState>(set => ({
  loading: false,
  valueSession: null,
  valueSessionToken: '',
  setLoading: val => set({ loading: val }),
  updateValueSession: val => set({ valueSession: val }),
  updateSessionToken: val => set({ valueSessionToken: val }),
}));
