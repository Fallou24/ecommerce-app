import React from "react";
import ProductItem from "./ProductItem";
import { useQuery } from "@tanstack/react-query";
import { getProductOfACategory, getProducts } from "@/services/queries";
import { Product } from "@/services/types";
import { useProductsStore } from "@/stores/productsStore";

export default function ProductList() {
  const searchTerm = useProductsStore((state) => state.searchTerm);
  const selectedCategory = useProductsStore((state) => state.selectedCategory);
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });
  const { data: products, isPending: isLoading } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: () => getProductOfACategory(selectedCategory),
    enabled: Boolean(selectedCategory),
  });
  isPending && <p>Chargement ...</p>;
  isError && <p>{error.message}</p>;
  let productsToDisplay: Product[] = selectedCategory ? products : data;
  productsToDisplay = productsToDisplay?.filter((product: Product) =>
    product.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
  );
  return (
    <div className="grid grid-cols-4 gap-8">
      {productsToDisplay?.map((product: Product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}
