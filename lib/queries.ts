import { useProductsStore } from "@/stores/productsStore";
import { Cart, CartItem, Product } from "@prisma/client";
import axios from "axios";

export async function getProducts(page: number, searchTerm: string) {
  const data = await axios.get(
    searchTerm
      ? "api/products?page=" + page + "&search=" + searchTerm
      : "api/products?page=" + page
  );
  const products: { products: Product[]; totalPages: number } = data.data;

  return products;
}

export async function getSingleProduct(productId: string): Promise<Product> {
  const product = await axios.get("api/products/" + productId);
  return product.data;
}

export async function getProductsOfACategory(
  selectedCategory: string,
  page: number,
  searchTerm: string
) {
  const data = await axios.get(
    searchTerm
      ? "api/products/category/" +
          selectedCategory +
          "?page=" +
          page +
          "&search=" +
          searchTerm
      : "api/products/category/" + selectedCategory + "?page=" + page
  );
  const products: { products: Product[]; totalPages: number } = data.data;

  return products;
}

interface cartItemType extends CartItem {
  products: Product;
}


export async function getUserCart(userId: string):Promise<Cart> {
  const res = await axios.get("api/cart?userId=" + userId);
  return res.data;
}
