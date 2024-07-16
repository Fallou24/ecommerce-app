import { ProductsPagination } from "@/components/home/Pagination";
import ProductList from "@/components/home/ProductList";
import { useProducts, useProductsOfACategory } from "@/hooks/products";
import { useProductsStore } from "@/stores/productsStore";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const selectedCategory = useProductsStore((state) => state.selectedCategory);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [selectedCategory]);
  const productsOfACategory = useProductsOfACategory(page)
  const products = useProducts(page)

  const response = selectedCategory
    ? productsOfACategory
    : products;
  const { data, isPending, isPlaceholderData, isFetching } = response;
  const totalPages = data?.totalPages;
  const productsToDisplay = data?.products;
  if (isPending) {
    return <p>Chargement ...</p>;
  }
  return (
    <main className="max-w-screen-2xl p-4">
      <ProductList products={productsToDisplay || []} />
      <ProductsPagination
        page={page}
        isPlaceholderData={isPlaceholderData}
        setPage={setPage}
        totalPages={totalPages!}
      />
    </main>
  );
}
