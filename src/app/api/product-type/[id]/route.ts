import prisma from "@/lib/prisma";
import { requestMiddleware } from "@/middlewares/requestMiddleware";

export const GET = requestMiddleware(async ({ params }) => {
  return await prisma.productType.findFirst({ where: { id: params.id } });
});

export const PUT = requestMiddleware(async ({ data, params }) => {
  return await prisma.productType.update({ where: { id: params.id }, data });
});

export const DELETE = requestMiddleware(async ({ params }) => {
  return await prisma.productType.delete({ where: { id: params.id } });
});
