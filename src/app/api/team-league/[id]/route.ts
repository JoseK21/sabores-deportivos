import prisma from "@/lib/prisma";
import { requestMiddleware } from "@/middlewares/requestMiddleware";

export const GET = requestMiddleware(async ({ params }) => {
  return await prisma.teamLeague.findFirst({ where: { id: params.id }, include: { Team: true, League: true } });
});

export const PUT = requestMiddleware(async ({ data, params }) => {
  return await prisma.teamLeague.update({ where: { id: params.id }, data, include: { Team: true, League: true } });
});

export const DELETE = requestMiddleware(async ({ params }) => {
  return await prisma.teamLeague.delete({ where: { id: params.id }, include: { Team: true, League: true } });
});
