import prisma from "@/lib/prisma";
import { requestMiddleware } from "@/middlewares/requestMiddleware";

export const GET = requestMiddleware(async ({ params }) => {
  return await prisma.teamTournament.findMany({
    where: { tournamentId: params.tournamentId },
    include: { Team: true, Tournament: true },
  });
});
