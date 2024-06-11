import prisma from "@/lib/prisma";
import { requestMiddleware } from "@/middlewares/requestMiddleware";

export const GET = requestMiddleware(async ({ params }) => {
  return await prisma.tournament.findFirst({ where: { id: params.id }, include: { Event: true } });
});

export const PUT = requestMiddleware(async ({ data, params }) => {
  return await prisma.tournament.update({ where: { id: params.id }, data, include: { Event: true } });
});

export const DELETE = requestMiddleware(async ({ params }) => {
  return await prisma.tournament.delete({ where: { id: params.id }, include: { Event: true } });
});
