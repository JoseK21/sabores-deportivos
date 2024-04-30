import prisma from "@/lib/prisma";
import { ProductType } from "@/types/product-type";
import { requestMiddleware } from "@/middlewares/requestMiddleware";

export const GET = requestMiddleware(async () => {
  return await prisma.productType.findMany();
});

export const POST = requestMiddleware(async ({ data }: { data: ProductType }) => {
  return await prisma.productType.create({ data });
});
