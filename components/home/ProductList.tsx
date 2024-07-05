import React from "react";
import ProductItem from "./ProductItem";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/queries";
import { Product } from "@/services/types";

export default function ProductList() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });
  isPending && <p>Chargement ...</p>;
  isError && <p>{error.message}</p>;

  return (
    <div className="grid grid-cols-4 gap-8">
      {data?.map((product: Product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}
