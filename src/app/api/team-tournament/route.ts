import prisma from "@/lib/prisma";
import { TeamTournament } from "@prisma/client";
import { requestMiddleware } from "@/middlewares/requestMiddleware";
import { z } from "zod";

const TeamTournamentSchema = z.object({
  teamId: z.string().nonempty("El ID del equipo es requerido"),
  tournamentId: z.string().nonempty("El ID del torneo es requerido"),
});

export const GET = requestMiddleware(async () => {
  return await prisma.teamTournament.findMany({ include: { Team: true, Tournament: true } });
});

export const POST = requestMiddleware(async ({ data }: { data: Partial<TeamTournament> }) => {
  const validatedData = TeamTournamentSchema.parse(data);

  return await prisma.teamTournament.create({ data: validatedData, include: { Team: true, Tournament: true } });
});
