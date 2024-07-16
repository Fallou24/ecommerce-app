import prisma from "@/lib/prismadb";
import { Product } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product | null>
) {
  const { productId } = req.query;
  if (req.method === "GET") {
    try {
      const data = await prisma.product.findUnique({
        where: {
          id: String(productId),
        },
      });
      res.status(200).json(data);
    } catch (e) {
      console.log(e);
    }
  }
}
