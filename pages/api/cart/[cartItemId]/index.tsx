import prisma from "@/lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.cartItemId;
  if (req.method === "DELETE") {
    try {
    const data=  await prisma.cartItem.delete({
        where: {
          id: String(id),
        },
      });
      res.status(200).json(data);
    } catch (e) {
      console.log(e);
    }
  }

  if (req.method === "PATCH") {
    const { quantity } = req.body;
    try {
     const data= await prisma.cartItem.update({
        where: {
          id: String(id),
        },
        data: {
          quantity,
        },
      });
      res.status(200).json(data)
    } catch (e) {
      console.log(e);
    }
  }
}
