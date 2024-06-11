import prisma from "@/lib/prisma";
import { requestMiddleware } from "@/middlewares/requestMiddleware";

export const GET = requestMiddleware(async ({ params }) => {
  return await prisma.sport.findFirst({ where: { id: params.id } });
});

export const PUT = requestMiddleware(async ({ data, params }) => {
  return await prisma.sport.update({ where: { id: params.id }, data });
});

export const DELETE = requestMiddleware(async ({ params }) => {
  return await prisma.sport.delete({ where: { id: params.id } });
});
