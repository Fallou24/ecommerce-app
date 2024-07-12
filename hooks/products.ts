import {
  getProducts,
  getProductsOfACategory,
  getSingleProduct,
} from "@/lib/queries";
import { useProductsStore } from "@/stores/productsStore";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useProducts(page: number) {
  const selectedCategory = useProductsStore((state) => state.selectedCategory);
  const searchTerm = useProductsStore((state) => state.searchTerm);
  const { isPending, isError, data, error, isPlaceholderData, isFetching } =
    useQuery({
      queryKey: ["products", { page, searchTerm }],
      queryFn: () => getProducts(page, searchTerm),
      placeholderData: keepPreviousData,
    });

  return { isPending, isError, data, error, isPlaceholderData, isFetching };
}

export function useSingleProduct(productId: string) {
  const { isPending, isError, data } = useQuery({
    queryKey: ["products", productId],
    queryFn: () => getSingleProduct(String(productId)),
  });
  return { data, isPending, isError };
}

export function useProductsOfACategory(page: number) {
  const selectedCategory = useProductsStore((state) => state.selectedCategory);
  const searchTerm = useProductsStore((state) => state.searchTerm);
  return useQuery({
    queryKey: ["products", { page, searchTerm, selectedCategory }],
    queryFn: () => getProductsOfACategory(selectedCategory, page, searchTerm),
    placeholderData: keepPreviousData,
  });
}
