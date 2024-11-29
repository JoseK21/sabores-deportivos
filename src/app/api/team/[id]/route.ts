import prisma from "@/lib/prisma";
import { requestMiddleware } from "@/middlewares/requestMiddleware";

export const GET = requestMiddleware(async ({ params }) => {
  return await prisma.team.findFirst({ where: { id: params.id }, include: { Sport: true } });
});

export const PUT = requestMiddleware(async ({ data, params }) => {
  return await prisma.team.update({ where: { id: params.id }, include: { Sport: true }, data });
});

export const DELETE = requestMiddleware(async ({ params }) => {
  return await prisma.team.delete({ where: { id: params.id }, include: { Sport: true } });
});
