import { create } from 'zustand';

import type { God } from './types';

interface GodState {
  choosenGod: God | null;
  setChoosenGod: (god: God) => void;
  hiddenGods: Set<string>;
  toggleHiddenGod: (god: God) => void;
  addHiddenGods: (gods: God[]) => void;
  removeHiddenGods: (gods: God[]) => void;
  restart: () => void;
}

export const useGod = create<GodState>((set) => ({
  choosenGod: null,
  hiddenGods: new Set(),
  setChoosenGod: (god: God) => set({ choosenGod: god }),

  toggleHiddenGod: (god: God) =>
    set((state) => {
      if (state.hiddenGods.has(god.name)) state.hiddenGods.delete(god.name);
      else state.hiddenGods.add(god.name);
      return {
        hiddenGods: new Set(state.hiddenGods),
      };
    }),

  addHiddenGods: (gods: God[]) => {
    set((state) => {
      for (const god of gods) {
        state.hiddenGods.add(god.name);
      }

      return {
        hiddenGods: new Set(state.hiddenGods),
      };
    });
  },

  removeHiddenGods: (gods: God[]) =>
    set((state) => {
      for (const god of gods) {
        state.hiddenGods.delete(god.name);
      }

      return {
        hiddenGods: new Set(state.hiddenGods),
      };
    }),
  restart: () =>
    set(() => ({
      choosenGod: null,
      hiddenGods: new Set(),
    })),
}));
