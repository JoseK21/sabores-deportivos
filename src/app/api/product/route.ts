import prisma from "@/lib/prisma";
import { Product } from "@/types/product";
import { requestMiddleware } from "@/middlewares/requestMiddleware";

export const GET = requestMiddleware(async () => {
  return await prisma.product.findMany();
});

export const POST = requestMiddleware(async ({ data }: { data: Product }) => {
  return await prisma.product.create({ data });
});
