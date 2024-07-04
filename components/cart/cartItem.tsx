import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Separator } from "../ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";

export default function CartItem() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Produit</TableHead>
          <TableHead>Prix</TableHead>
          <TableHead className="text-center">Quantité</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            {" "}
            <div className="flex gap-4 flex-row items-center">
              <Card className="p-2">
                <CardContent className="w-max">
                  <Image
                    src="https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg"
                    alt="image"
                    width={60}
                    height={60}
                  />
                </CardContent>
              </Card>
              <div>
                <p className="font-medium mb-1">Sac à dos</p>
                <p className="mb-1">Catégorie 1</p>
                <p>Quantité : 4</p>
              </div>
            </div>
          </TableCell>
          <TableCell>$250</TableCell>
          <TableCell>
            {" "}
            <p className="mb-3 flex flex-row items-center gap-2 content-center justify-center">
              <span>Quantity : </span>
              <button className="border border-black border-opacity-50 p-1">
                <Minus size={15} absoluteStrokeWidth />
              </button>
              <span>1</span>
              <button className="border border-black border-opacity-50 p-1">
                <Plus size={15} absoluteStrokeWidth />
              </button>
            </p>
          </TableCell>
          <TableCell className="text-right">$125</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            {" "}
            <div className="flex gap-4 flex-row items-center">
              <Card className="p-2">
                <CardContent className="w-max">
                  <Image
                    src="https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg"
                    alt="image"
                    width={60}
                    height={60}
                  />
                </CardContent>
              </Card>
              <div>
                <p className="font-medium">Sac à dos</p>
                <p>Catégorie 1</p>
                <p>Quantité 1</p>
              </div>
            </div>
          </TableCell>
          <TableCell>$250</TableCell>
          <TableCell>
            {" "}
            <p className="mb-3 flex flex-row items-center gap-2 content-center justify-center">
              <span>Quantity : </span>
              <button className="border border-black border-opacity-50 p-1">
                <Minus size={15} absoluteStrokeWidth />
              </button>
              <span>1</span>
              <button className="border border-black border-opacity-50 p-1">
                <Plus size={15} absoluteStrokeWidth />
              </button>
            </p>
          </TableCell>
          <TableCell className="text-right">$125</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>
            <Button>Clear cart</Button>
          </TableCell>
          <TableCell className="text-right">
            <p className="flex gap-12 flex-row justify-end items-center mb-4">
                <span className="text-xl font-medium">Total</span>
                <span className="text-xl font-medium">$142</span>
            </p>
            <Button className="bg-white text-black border border-black hover:text-white">Procéder au payment</Button>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
  
}
