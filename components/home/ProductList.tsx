import React from "react";
import ProductItem from "./ProductItem";
import { useQuery } from "@tanstack/react-query";
import { getProductOfACategory, getProducts } from "@/services/queries";
import { Product } from "@/services/types";
import { useCategoryStore } from "@/stores/categoryStore";

export default function ProductList() {
  const selectedCategory = useCategoryStore(state=>state.selectedCategory)
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
  const productsToDisplay = selectedCategory ? products :  data
  
  return (
    <div className="grid grid-cols-4 gap-8">
      {productsToDisplay?.map((product: Product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}
