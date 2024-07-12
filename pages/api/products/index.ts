import prisma from "@/lib/prismadb";
import { Product } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

type ResponseData = { products: Product[]; totalPages: number };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const page = Number(req.query.page);
  const searchTerm = req.query.search;

  if (req.method === "GET") {
    if (searchTerm) {
      try {
        const products = await prisma.product.findMany({
          skip: (page - 1) * 8,
          take: 8,
          where: {
            title: { contains: String(searchTerm), mode: "insensitive" },
          },
        });
        let totalPages = await prisma.product.count({
          where: {
            title: { contains: String(searchTerm), mode: "insensitive" },
          },
        });
        totalPages = Math.ceil(totalPages / 8);
        res.status(200).json({ products, totalPages });
      } catch (e) {
        console.log(e);
      }
    }
    try {
      const products = await prisma.product.findMany({
        skip: (page - 1) * 8,
        take: 8,
      });
      let totalPages = await prisma.product.count();
      totalPages = Math.ceil(totalPages / 8);
      res.status(200).json({ products, totalPages });
    } catch (e) {
      console.log(e);
    }
  }
}
