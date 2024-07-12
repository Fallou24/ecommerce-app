import { ProductsPagination } from "@/components/home/Pagination";
import ProductList from "@/components/home/ProductList";
import { useProducts } from "@/hooks/products";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [page, setPage] = useState(1);
  const { data, isPending, isPlaceholderData, isFetching } = useProducts(page);
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
