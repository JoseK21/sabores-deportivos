import prisma from "@/lib/prisma";
import { requestMiddleware } from "@/middlewares/requestMiddleware";

export const GET = requestMiddleware(async ({ params }) => {
  return await prisma.businessScheduled.findFirst({ where: { id: params.id } });
});

export const PUT = requestMiddleware(async ({ data, params }) => {
  return await prisma.businessScheduled.update({ where: { id: params.id }, data });
});
