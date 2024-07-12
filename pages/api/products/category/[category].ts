import prisma from "@/lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
type ResponseData = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const page = Number(req.query.page);
  const searchTerm = req.query.search;

  const { category } = req.query;
  if (req.method == "GET") {
    if (searchTerm) {
      try {
        const products = await prisma.product.findMany({
          skip: (page - 1) * 8,
          take: 8,
          where: {
            AND: [
              {
                category: {
                  equals: String(category),
                },
              },
              {
                title: { contains: String(searchTerm), mode: "insensitive" },
              },
            ],
          },
        });
        let totalPages = await prisma.product.count({
          where: {
            AND: [
              {
                category: {
                  equals: String(category),
                },
              },
              {
                title: { contains: String(searchTerm), mode: "insensitive" },
              },
            ],
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
        where: {
          category: {
            equals: String(category),
          },
        },
      });
      let totalPages = await prisma.product.count({
        where: {
          category: String(category),
        },
      });
      totalPages = Math.ceil(totalPages / 8);
      res.status(200).json({ products, totalPages });
    } catch (e) {
      console.log(e);
    }
  }
}
