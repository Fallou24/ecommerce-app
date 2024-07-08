import { create } from "zustand";

type Types = {
  selectedCategory: string;
  selectedACategory: (categoy: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

export const useProductsStore = create<Types>((set) => ({
  selectedCategory: "",
  searchTerm: "",
  setSearchTerm: (term) => set(() => ({ searchTerm: term })),
  selectedACategory: (category) => set(() => ({ selectedCategory: category })),
}));
