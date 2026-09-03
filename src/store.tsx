import { create } from "zustand";

import allGods from "./gods.json";

import type { God } from "./types";

interface GodState {
  choosenGod: God | null;
  setChoosenGod: (god: God) => void;
  hiddenGods: Set<string>;
  toggleHiddenGod: (god: God) => void;
  resetHiddenGods: () => void;
  pickRandomGod: () => void;
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

  resetHiddenGods: () =>
    set((state) => {
      state.hiddenGods.clear();

      return {
        hiddenGods: new Set(),
      };
    }),

  pickRandomGod: () => {
    const randomGod = allGods[Math.floor(Math.random() * allGods.length)];
    set({ choosenGod: randomGod });
  },
}));

interface FiltersState {
  filters: {
    type: "magical" | "physical" | null;
    gender: "male" | "female" | null;
    attack_type: "melee" | "ranged" | null;
  };
  setFilter: (
    key: keyof FiltersState["filters"],
    value: FiltersState["filters"][keyof FiltersState["filters"]],
  ) => void;
  resetFilters: () => void;
}

export const useFilters = create<FiltersState>((set) => ({
  filters: {
    type: null,
    gender: null,
    attack_type: null,
  },

  setFilter: (key, value) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    }));
  },

  resetFilters: () => {
    set({ filters: { type: null, gender: null, attack_type: null } });
  },
}));

export const resetGame = () => {
  useFilters.setState({
    filters: {
      type: null,
      gender: null,
      attack_type: null,
    },
  });
  useGod.setState({
    choosenGod: null,
    hiddenGods: new Set(),
  });
};
