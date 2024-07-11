import { Product } from "@prisma/client";
import axios from "axios";

export async function getProducts(selectedCategory: string) {
  const data = await axios.get("http://localhost:3000/api/products");
  const products: Product[] = data.data;
  const productsOfCategory = products.filter(
    (p) => p.category === selectedCategory
  );
  return selectedCategory ? productsOfCategory : products;
}

export async function getSingleProduct(productId: string): Promise<Product> {
  const product = await axios.get(
    "http://localhost:3000/api/products/" + productId
  );
  return product.data;
}
