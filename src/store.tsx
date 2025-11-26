import { create } from 'zustand';

import type { God } from './types';

interface GodState {
  choosenGod: God | null;
  setChoosenGod: (god: God) => void;
  hiddenGods: God[];
  toggleHiddenGod: (god: God) => void;
  restart: () => void;
}

export const useGod = create<GodState>((set) => ({
  choosenGod: null,
  hiddenGods: [],
  setChoosenGod: (god: God) => set({ choosenGod: god }),
  toggleHiddenGod: (god: God) =>
    set((state) => ({
      hiddenGods: state.hiddenGods.includes(god)
        ? state.hiddenGods.filter((g) => g !== god)
        : [...state.hiddenGods, god],
    })),

  restart: () =>
    set(() => ({
      choosenGod: null,
      hiddenGods: [],
    })),
}));
