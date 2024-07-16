import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { CartItem, Product } from "@prisma/client";
import Item from "./CartItem";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
interface CartItemType extends CartItem {
  product: Product;
}

export default function CartItems({ userCart }: { userCart: CartItemType[] }) {
  const total = userCart.reduce((accumulator, cartItem) => {
    return accumulator + cartItem.product.price * cartItem.quantity;
  }, 0);
const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: () => {
      return axios.delete("api/cart");
    },
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["cart"]})
    }
  });

  function handleClearCart() {
    mutate();
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-center">Quantity</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {userCart.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>
            <Button onClick={handleClearCart}>Clear cart</Button>
          </TableCell>
          <TableCell className="text-right">
            <p className="flex gap-12 flex-row justify-end items-center mb-4">
              <span className="text-xl font-medium">Total</span>
              <span className="text-xl font-medium">${total}</span>
            </p>
            <Button className="bg-white text-black border border-black hover:text-white">
              Procéder au payment
            </Button>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
