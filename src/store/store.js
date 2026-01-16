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
  glasses: [...initialGlasses],
  message: { hasMsg: false, message: "" },
  glasses: [...initialGlasses],
  flavors: [...initialFlavors],
  toppings: [...initialToppings],
  accompaniments: [...initialAccompaniments],
  wheys: [...initialWheys],
  combos: [...initialCombos],

  removeToGlass: item =>
    set(state => ({ glassQuant: state.glassQuant - item })),

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

  addGlass: (id, quant) =>
    set(state => ({
      glasses: state.glasses.map(item =>
        item.id === id ? { ...item, quant: item.quant + quant } : item
      ),
    })),

  removeGlass: (id, quant) =>
    set(state => ({
      glasses: state.glasses.map(item =>
        item.id === id ? { ...item, quant: item.quant - quant } : item
      ),
    })),

  setMessage: message => {
    set(state => ({
      message: { hasMsg: true, msg: message },
    }));
    setTimeout(() => {
      set(() => ({
        message: { hasMsg: false, msg: "" },
      }));
    }, 2000);
  },
}));
