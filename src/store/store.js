import { create } from "zustand";
import {
  initialAccompaniments,
  initialCombos,
  initialFlavors,
  initialGlasses,
  initialToppings,
  initialWheys,
} from "../data/data";

const loadFromStorage = key => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const useMyStore = create((set, get) => ({
  glasses: loadFromStorage("glasses") ?? [...initialGlasses],
  flavors: [...initialFlavors],
  toppings: [...initialToppings],
  accompaniments: [...initialAccompaniments],
  wheys: [...initialWheys],
  combos: [...initialCombos],
  message: {
    hasMsg: false,
    msg: "",
  },
  addGlass: (id, quant = 1) =>
    set(state => {
      const glasses = state.glasses.map(item =>
        item.id === id ? { ...item, quant: item.quant + quant } : item
      );

      localStorage.setItem("glasses", JSON.stringify(glasses));

      return { glasses };
    }),

  removeGlass: (id, quant) =>
    set(state => {
      const glasses = state.glasses.map(item =>
        item.id === id ? { ...item, quant: item.quant - quant } : item
      );

      localStorage.setItem("glasses", JSON.stringify(glasses));

      return { glasses };
    }),

  removeComboGlass: (size, size2, quant) =>
    set(state => {
      const glasses = state.glasses
        .map(item =>
          item.id === size ? { ...item, quant: item.quant - quant } : item
        )
        .map(item =>
          item.id === size2 ? { ...item, quant: item.quant - quant } : item
        );

      localStorage.setItem("glasses", JSON.stringify(glasses));

      return { glasses };
    }),

  addItem: (key, item) =>
    set(state => {
      if (!Array.isArray(state[key])) return {};
      return { [key]: [...state[key], item] };
    }),

  removeItem: (key, id) =>
    set(state => {
      if (!Array.isArray(state[key])) return {};
      return { [key]: state[key].filter(item => item.id !== id) };
    }),

  updateItem: (key, id, data) =>
    set(state => {
      if (!Array.isArray(state[key])) return {};
      return {
        [key]: state[key].map(item =>
          item.id === id ? { ...item, ...data } : item
        ),
      };
    }),

  setMessage: msg => {
    set({
      message: { hasMsg: true, msg },
    });

    setTimeout(() => {
      set({
        message: { hasMsg: false, msg: "" },
      });
    }, 2000);
  },
}));
