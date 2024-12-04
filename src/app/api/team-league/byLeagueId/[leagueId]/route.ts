import prisma from "@/lib/prisma";
import { requestMiddleware } from "@/middlewares/requestMiddleware";

export const GET = requestMiddleware(async ({ params }) => {
  return await prisma.teamLeague.findMany({
    where: { leagueId: params.leagueId },
    include: { Team: true, League: true },
  });
});
