import prisma from "@/lib/prisma";
import { requestMiddleware } from "@/middlewares/requestMiddleware";

export const GET = requestMiddleware(async ({ params }) => {
  return await prisma.league.findFirst({ where: { id: params.id }, include: { Sport: true } });
});

export const PUT = requestMiddleware(async ({ data, params }) => {
  return await prisma.league.update({ where: { id: params.id }, data, include: { Sport: true } });
});

export const DELETE = requestMiddleware(async ({ params }) => {
  return await prisma.league.delete({ where: { id: params.id }, include: { Sport: true } });
});
