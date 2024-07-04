import { getSingleProduct } from "@/services/queries";
import { useQuery } from "@tanstack/react-query";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

export default function SingleProduct() {
  const router = useRouter();
  const productId = router.query.productId;
  const { isPending, isError, data } = useQuery({
    queryKey: ["products", productId],
    queryFn: () => getSingleProduct(String(productId)),
  });
  isPending && <p>Chargement</p>;
  isError && <p>Erreur</p>;
  
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
          <p className="mb-2">{data?.rating.count} reviews</p>
          <p className="mb-2">{data?.description}</p>
          <p className="mb-3 flex flex-row items-center gap-2 content-center">
            <span>Quantity : </span>
            <button className="border border-black border-opacity-50 p-1">
              <Minus size={15} absoluteStrokeWidth />
            </button>
            <span>1</span>
            <button className="border border-black border-opacity-50 p-1">
              <Plus size={15} absoluteStrokeWidth />
            </button>
          </p>
          <button className="bg-black opacity-70 p-3 rounded text-white cursor-pointer">
            Add to cart
          </button>
        </div>
      </div>
    </main>
  );
}
