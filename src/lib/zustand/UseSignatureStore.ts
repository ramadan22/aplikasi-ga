import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Position = { x: number; y: number };
type State = {
  position: Record<number, Position>;
  setPosition: (id: number, pos: Position) => void;
  resetPosition: () => void;
};

export const useSignatureStore = create<State>()(
  persist(
    set => ({
      position: {},
      setPosition: (id, pos) =>
        set(state => ({
          position: { ...state.position, [id]: pos },
        })),
      resetPosition: () => set({ position: {} }),
    }),
    {
      name: 'signature-position', // key penyimpanan di localStorage
    },
  ),
);
