import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Position = { x: number; y: number };

type SignaturePosItem = {
  id: string;
  positionX: string | null;
  positionY: string | null;
};

type State = {
  position: Record<string, Position>;
  setPosition: (id: string, pos: Position) => void;
  initializePosition: (items: SignaturePosItem[]) => void;
  resetPosition: () => void;
};

const DEFAULT_POSITION: Position[] = [
  { x: 1, y: 120 },
  { x: 230, y: 119 },
  { x: 462, y: 119 },
  { x: 231, y: 269 },
  { x: 462, y: 269 },
];

export const useSignatureStore = create<State>()(
  persist(
    (set, get) => ({
      position: {},

      setPosition: (id, pos) =>
        set(state => ({
          position: { ...state.position, [id]: pos },
        })),

      initializePosition: items =>
        set(state => {
          const updated = { ...state.position };

          items.forEach((item, idx) => {
            const { id, positionX, positionY } = item;

            if (!updated[id]) {
              if (positionX != null && positionY != null) {
                updated[id] = { x: Number(positionX), y: Number(positionY) };
              } else {
                updated[id] = DEFAULT_POSITION[idx] ?? { x: 50, y: 50 };
              }
            }
          });

          return { position: updated };
        }),

      resetPosition: () => {
        const ids = Object.keys(get().position);
        const resetPos: Record<string, Position> = {};

        ids.forEach((id, idx) => {
          resetPos[id] = DEFAULT_POSITION[idx] ?? { x: 50, y: 50 };
        });

        set({ position: resetPos });
      },
    }),
    { name: 'signature-position' },
  ),
);
