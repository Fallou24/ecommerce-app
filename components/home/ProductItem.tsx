import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { Product } from "@prisma/client";

export default function ProductItem({ product }: { product: Product }) {

  return (
    <Link href={"/" + product.id} className="w-full">
      <Card className="text-center  p-2 h-full">
        <CardContent>
          <div style={{ position: "relative", height: "200px" }}>
            <Image
              src={product.image}
              alt=""
              fill
              sizes="100%"
              style={{ objectFit: "contain" }}
            />
          </div>

          <h4 className="mt-2 ">{product.title}</h4>
          <p className="font-medium mt-1">${product.price}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
