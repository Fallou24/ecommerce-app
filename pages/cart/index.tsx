import CartItem from "@/components/cart/cartItem";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Cart() {
  const isCartEmpty = false;
  if (isCartEmpty) {
    return (
      <main className="max-w-screen-2xl p-4 pt-8">
        <h1 className="text-3xl mb-6 font-bold">Votre panier</h1>
        <p className="mb-4">
          Il semble que vous n’ayez encore ajouté aucun article au panier.{" "}
        </p>
        <Button className="bg-black">
          <Link href="/">Explore Products</Link>
        </Button>
      </main>
    );
  }
  return (
    <main className="max-w-screen-2xl p-4 ">
      <h1 className="font-bold text-3xl mb-10">Votre panier</h1>
      <CartItem />
    </main>
  );
}
