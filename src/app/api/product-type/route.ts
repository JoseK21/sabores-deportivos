import prisma from "@/lib/prisma";
import { ProductType } from "@prisma/client";
import { requestMiddleware } from "@/middlewares/requestMiddleware";

export const GET = requestMiddleware(async () => {
  return await prisma.productType.findMany({ orderBy: { name: "asc" } });
});

export const POST = requestMiddleware(async ({ data }: { data: ProductType }) => {
  return await prisma.productType.create({ data });
});
