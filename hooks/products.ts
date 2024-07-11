import { getProducts, getSingleProduct } from "@/lib/queries";
import { useProductsStore } from "@/stores/productsStore";
import { useQuery } from "@tanstack/react-query";

export function useProducts() {
  const selectedCategory = useProductsStore((state) => state.selectedCategory);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: () => getProducts(selectedCategory),
  });

  return { isPending, isError, data, error };
}

export function useSingleProduct(productId: string) {
  const { isPending, isError, data } = useQuery({
    queryKey: ["products", productId],
    queryFn: () => getSingleProduct(String(productId)),
  });
  return { data, isPending, isError };
}
