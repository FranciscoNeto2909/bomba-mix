import { create } from "zustand";
import {
  initialAccompaniments,
  initialCombos,
  initialFlavors,
  initialGlasses,
  initialSales,
  initialToppings,
} from "../data/data";

const localGlasses = JSON.parse(localStorage.getItem("glasses"));
const localCombos = JSON.parse(localStorage.getItem("combos"));

export const useMyStore = create((set, get) => ({
  glasses: localGlasses ? localGlasses : [...initialGlasses],
  flavors: [...initialFlavors],
  toppings: [...initialToppings],
  accompaniments: [...initialAccompaniments],
  combos: localCombos ? localCombos : [...initialCombos],
  sales: initialSales,
  message: {
    hasMsg: false,
    msg: "",
  },
  addGlass: (id, quant = 1) =>
    set(state => {
      const glasses = state.glasses.map(item =>
        item.id === id ? { ...item, quant: item.quant + quant } : item,
      );
      localStorage.setItem("glasses", JSON.stringify(glasses));
      return { glasses };
    }),

  removeGlass: (id, quant) =>
    set(state => {
      const glasses = state.glasses.map(item =>
        item.id === id ? { ...item, quant: item.quant - quant } : item,
      );
      localStorage.setItem("glasses", JSON.stringify(glasses));
      return { glasses };
    }),

  removeComboGlass: (size, size2, quant) =>
    set(state => {
      const glasses = state.glasses
        .map(item =>
          item.id === size ? { ...item, quant: item.quant - quant } : item,
        )
        .map(item =>
          item.id === size2 ? { ...item, quant: item.quant - quant } : item,
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
      const newState = {
        [key]: state[key].map(item =>
          item.id === id ? { ...item, ...data } : item,
        ),
      };
      if (key === "glasses") {
        localStorage.setItem("glasses", JSON.stringify(newState.glasses));
      }
      if (key === "combos") {
        localStorage.setItem("combos", JSON.stringify(newState.combos));
      }
      return newState;
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
