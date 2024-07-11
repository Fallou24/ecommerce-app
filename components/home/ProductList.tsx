import React from "react";
import { useProductsStore } from "@/stores/productsStore";
import { useProducts } from "@/hooks/products";
import ProductItem from "./ProductItem";
import { Product } from "@prisma/client";

export default function ProductList() {
  const searchTerm = useProductsStore((state) => state.searchTerm);

  const { data: productsToDisplay,isPending } = useProducts();
 if (isPending) {
  return <p>Chargement ...</p>
 }
  return (
    <div className="grid grid-cols-4 gap-8">
      {productsToDisplay?.map((product: Product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}
