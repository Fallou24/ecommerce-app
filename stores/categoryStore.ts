import { create } from "zustand";

type Types = {
  selectedCategory: string;
  selectedACategory: (categoy: string) => void;
};

export const useCategoryStore = create<Types>((set) => ({
  selectedCategory: "",
  selectedACategory: (category) => set(() => ({ selectedCategory: category })),
}));
