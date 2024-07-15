import { Button } from "@/components/ui/button";
import { useSingleProduct } from "@/hooks/products";
import { useCurrentUser } from "@/hooks/useUser";
import { useUserCart } from "@/hooks/useUserCart";
import { CartItem } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SingleProduct() {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const productId = router.query.productId || null;
 
  const { data, isPending } = useSingleProduct(String(productId));
  const { data: user } = useCurrentUser();
  const userId: any = user ? user.id : null;
  const { data: userCart } = useUserCart(userId);

  const queryClient = useQueryClient();
  const isInCart = userCart?.some(
    (data) => data.productId === String(productId)
  );

  const { mutate } = useMutation({
    mutationFn: (data: {
      productId: string;
      quantity: number;
      userId: string;
    }) => {
      return axios.post("api/cart", data);
    },
    onSuccess: () => {
      toast.success("Le produit est ajouté au panier");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  function handleAddToCart() {
    mutate({ productId: String(productId), quantity, userId: user!.id });
  }

  return (
    <main className="max-w-screen-2xl p-4 ">
      <div className="flex flex-row items-center">
        <div
          className="w-1/2"
          style={{ position: "relative", height: "400px" }}
        >
          <Image
            src={data?.image!}
            alt="image"
            fill
            sizes="100%"
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="w-1/2">
          <h2 className="font-medium text-2xl mb-4">{data?.title}</h2>
          <p className="mb-2">${data?.price}</p>
          <p className="mb-2">{data?.description}</p>
          {!isInCart && (
            <p className="mb-3 flex flex-row items-center gap-2 content-center">
              <span>Quantity : </span>
              <button
                onClick={() => setQuantity((q) => (q > 1 ? q - 1 : q))}
                className="border border-black border-opacity-50 p-1"
              >
                <Minus size={15} absoluteStrokeWidth />
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="border border-black border-opacity-50 p-1"
              >
                <Plus size={15} absoluteStrokeWidth />
              </button>
            </p>
          )}

          {!user ? (
            <Button variant="outline">
              <Link href="/login">Se connecter</Link>
            </Button>
          ) : isInCart ? (
            <Button variant="outline">
              <Link href="/cart">View Cart</Link>
            </Button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="bg-black opacity-70 p-3 rounded text-white cursor-pointer"
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
