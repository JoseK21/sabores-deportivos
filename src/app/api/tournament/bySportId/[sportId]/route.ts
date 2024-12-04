import prisma from "@/lib/prisma";
import { requestMiddleware } from "@/middlewares/requestMiddleware";

export const GET = requestMiddleware(async ({ params }) => {
  return await prisma.tournament.findMany({ where: { sportId: params.sportId }, include: { Sport: true } });
});
