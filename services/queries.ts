import { Product } from "./types";

export async function getProducts(): Promise<Product[] | []> {
  return fetch("https://fakestoreapi.com/products?limit=8")
    .then((res) => res.json())
    .then((json) => json);
}

export async function getSingleProduct(productId: string):Promise<Product > {
  return fetch("https://fakestoreapi.com/products/" + productId)
    .then((res) => res.json())
    .then((json) => json);
}
