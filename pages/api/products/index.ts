import prisma from "@/lib/prismadb";
import { Product } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

type ResponseData = Product[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "GET") {
    try {
      const products =await prisma.product.findMany();
      res.status(200).json(products)

    } catch (e) {
      console.log(e);
    }
  }
}
