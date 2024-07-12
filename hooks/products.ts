import { getProducts, getSingleProduct } from "@/lib/queries";
import { useProductsStore } from "@/stores/productsStore";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useProducts(page: number) {
  const selectedCategory = useProductsStore((state) => state.selectedCategory);
  const searchTerm = useProductsStore((state) => state.searchTerm);
  const { isPending, isError, data, error, isPlaceholderData, isFetching } =
    useQuery({
      queryKey: ["products", { page, searchTerm }],
      queryFn: () => getProducts(selectedCategory, page, searchTerm),
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
