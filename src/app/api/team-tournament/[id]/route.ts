import prisma from "@/lib/prisma";
import { requestMiddleware } from "@/middlewares/requestMiddleware";

export const GET = requestMiddleware(async ({ params }) => {
  return await prisma.teamTournament.findFirst({ where: { id: Number(params.id) }, include: { Team: true, Tournament: true } });
});

export const PUT = requestMiddleware(async ({ data, params }) => {
  return await prisma.teamTournament.update({ where: { id: Number(params.id) }, data, include: { Team: true, Tournament: true } });
});

export const DELETE = requestMiddleware(async ({ params }) => {
  return await prisma.teamTournament.delete({ where: { id: Number(params.id) }, include: { Team: true, Tournament: true } });
});
