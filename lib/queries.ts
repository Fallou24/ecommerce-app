import { useProductsStore } from "@/stores/productsStore";
import { Product } from "@prisma/client";
import axios from "axios";

export async function getProducts(
  selectedCategory: string,
  page: number,
  searchTerm: string
) {
  const data = await axios.get(
    searchTerm
      ? "http://localhost:3000/api/products?page=" +
          page +
          "&search=" +
          searchTerm
      : "http://localhost:3000/api/products?page=" + page
  );
  const products: { products: Product[]; totalPages: number } = data.data;

  return products;
}

export async function getSingleProduct(productId: string): Promise<Product> {
  const product = await axios.get(
    "http://localhost:3000/api/products/" + productId
  );
  return product.data;
}
