import CartItems from "@/components/cart/cartItems";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/useUser";
import { useUserCart } from "@/hooks/useUserCart";
import { CartItem, Product } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
interface cartItemType extends CartItem {
  product: Product;
}

export default function Cart() {
  const { data: user } = useCurrentUser();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, []);

  const userId: any = user ? user.id : null;
  const { data: userCart } = useUserCart(userId);

  if (!userCart?.length) {
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
      <CartItems userCart={userCart} />
    </main>
  );
}
