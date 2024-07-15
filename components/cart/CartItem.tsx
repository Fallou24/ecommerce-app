import Image from "next/image";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { TableCell, TableRow } from "../ui/table";
import { Minus, Plus } from "lucide-react";
import { CartItem, Product } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useCurrentUser } from "@/hooks/useUser";
import toast from "react-hot-toast";
interface CartItemType extends CartItem {
  product: Product;
}

export default function Item({ item }: { item: CartItemType }) {
  const queryClient = useQueryClient();
  const { data: user } = useCurrentUser();

  const { mutate } = useMutation({
    mutationFn: (id: string) => {
      return axios.delete("api/cart/" + id);
    },
    onSuccess: () => {
      toast.success("Le produit est supprimé du panier");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const { mutate: update } = useMutation({
    mutationFn: (data: { id: string; quantity: number }) => {
      return axios.patch("api/cart/" + data.id, { quantity: data.quantity });
    },
    onMutate: async ({ id, quantity }) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const previousCartItem = queryClient.getQueryData([
        "cart",
        { userId: user?.id, cartId: id },
      ]);
      const newCartItem = { ...item, quantity };
      queryClient.setQueryData(
        ["cart", { userId: user?.id, cartId: id }],
        newCartItem
      );
      return { previousCartItem, newCartItem };
    },
    onError(error, newTodo, context) {
      queryClient.setQueryData(
        ["cart", { userId: user?.id, cartId: context?.newCartItem.id }],
        context?.previousCartItem
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart", { userId: user?.id }],
      });
    },
  });

  function handleDelete() {
    mutate(item.id);
  }
  function handleIncrease() {
    update({ id: item.id, quantity: item.quantity + 1 });
  }
  function handleDecrease() {
    update({
      id: item.id,
      quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity,
    });
  }

  return (
    <TableRow>
      <TableCell>
        {" "}
        <div className="flex gap-4 flex-row items-center">
          <Card className="p-2">
            <CardContent
              style={{
                position: "relative",
                height: "80px",
                width: "80px",
              }}
            >
              <Image
                src={item.product.image}
                alt="image"
                fill
                sizes="100%"
                style={{ objectFit: "contain" }}
              />
            </CardContent>
          </Card>
          <div>
            <p className="font-medium mb-1">
              {item.product.title.length > 40
                ? item.product.title.substring(0, 40) + " ..."
                : item.product.title}
            </p>

            <p className="mb-1">Quantité : {item.quantity}</p>
            <button className="underline" onClick={handleDelete}>
              Supprimer
            </button>
          </div>
        </div>
      </TableCell>
      <TableCell>${item.product.price}</TableCell>
      <TableCell>
        {" "}
        <p className="mb-3 flex flex-row items-center gap-2 content-center justify-center">
          <span>Quantity : </span>
          <button
            className="border border-black border-opacity-50 p-1"
            onClick={handleDecrease}
          >
            <Minus size={15} absoluteStrokeWidth />
          </button>
          <span>{item.quantity}</span>
          <button
            className="border border-black border-opacity-50 p-1"
            onClick={handleIncrease}
          >
            <Plus size={15} absoluteStrokeWidth />
          </button>
        </p>
      </TableCell>
      <TableCell className="text-right">
        ${item.product.price * item.quantity}
      </TableCell>
    </TableRow>
  );
}
