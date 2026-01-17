import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  initialAccompaniments,
  initialCombos,
  initialFlavors,
  initialGlasses,
  initialSales,
  initialToppings,
} from "../data/data";

export const useMyStore = create(
  persist(
    (set, get) => ({
      glasses: [...initialGlasses],
      flavors: [...initialFlavors],
      toppings: [...initialToppings],
      accompaniments: [...initialAccompaniments],
      combos: [...initialCombos],
      sales: initialSales,

      message: {
        hasMsg: false,
        msg: "",
      },

      addGlass: (id, quant) =>
        set(state => ({
          glasses: state.glasses.map(item =>
            item.id === id ? { ...item, quant: item.quant + quant } : item,
          ),
        })),

      removeGlass: (id, quant) =>
        set(state => ({
          glasses: state.glasses.map(item =>
            item.id === id ? { ...item, quant: item.quant - quant } : item,
          ),
        })),

      removeComboGlass: (size1, size2, quant) =>
        set(state => ({
          glasses: state.glasses.map(item =>
            item.id === size1 || item.id === size2
              ? { ...item, quant: item.quant - quant }
              : item,
          ),
        })),
      addComboGlass: (size1, size2, quant) =>
        set(state => ({
          glasses: state.glasses.map(item =>
            item.id === size1 || item.id === size2
              ? { ...item, quant: item.quant + quant }
              : item,
          ),
        })),

      addItem: (key, item) =>
        set(state => {
          if (key === "sales") {
            return {
              sales: {
                ...state.sales,
                delivery: item.delivery
                  ? [...state.sales.delivery, item]
                  : state.sales.delivery,
                bombamix: !item.delivery
                  ? [...state.sales.bombamix, item]
                  : state.sales.bombamix,
              },
            };
          }

          if (!Array.isArray(state[key])) return state;

          return {
            [key]: [...state[key], item],
          };
        }),

      updateItem: (key, id, data) =>
        set(state => {
          if (!Array.isArray(state[key])) return state;
          return {
            [key]: state[key].map(item =>
              item.id === id ? { ...item, ...data } : item,
            ),
          };
        }),

      removeOrder: order =>
        set(state => ({
          sales: {
            delivery: order.delivery
              ? state.sales.delivery.filter(item => item.id !== order.id)
              : state.sales.delivery,

            bombamix: !order.delivery
              ? state.sales.bombamix.filter(item => item.id !== order.id)
              : state.sales.bombamix,
          },
        })),

      setMessage: msg => {
        set({ message: { hasMsg: true, msg } });

        setTimeout(() => {
          set({ message: { hasMsg: false, msg: "" } });
        }, 2000);
      },
    }),
    {
      name: "my-store",
      partialize: state => ({
        glasses: state.glasses,
        combos: state.combos,
        sales: state.sales,
      }),
    },
  ),
);
