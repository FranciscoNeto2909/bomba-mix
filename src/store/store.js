import { create } from "zustand";
import {
  initialAccompaniments,
  initialCombos,
  initialFlavors,
  initialGlasses,
  initialToppings,
  initialWheys,
} from "../data/data";

export const useMyStore = create(set => ({
  glassQuant: 30,
  glasses: [...initialGlasses],
  flavors: [...initialFlavors],
  toppings: [...initialToppings],
  accompaniments: [...initialAccompaniments],
  wheys: [...initialWheys],
  combos: [...initialCombos],

  addToGlass: item => set(state => ({ glassQuant: item })),
  removeToGlass: item => set(state => ({ glassQuant:state.glassQuant - item })),

  addItem: (key, item) =>
    set(state => ({
      [key]: [...state[key], item],
    })),

  removeItem: (key, id) =>
    set(state => ({
      [key]: state[key].filter(item => item.id !== id),
    })),

  updateItem: (key, id, data) =>
    set(state => ({
      [key]: state[key].map(item =>
        item.id === id ? { ...item, ...data } : item
      ),
    })),
}));
