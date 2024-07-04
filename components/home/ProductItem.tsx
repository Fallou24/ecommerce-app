import Image from "next/image";
import React from "react";
import { Product } from "@/services/types";

export default function ProductItem({ product }: { product: Product }) {

  return (
    <div className="text-center w-full  shadow-lg p-2">
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
      <p className="text-sm mt-1">{product.rating.count} reviews</p>
      <p className="font-medium mt-1">${product.price}</p>
    </div>
  );
}
