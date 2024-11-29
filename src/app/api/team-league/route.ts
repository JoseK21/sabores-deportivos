import prisma from "@/lib/prisma";
import { TeamLeague } from "@prisma/client";
import { requestMiddleware } from "@/middlewares/requestMiddleware";

export const GET = requestMiddleware(async () => {
  return await prisma.teamLeague.findMany({ include: { Team: true, League: true } });
});

export const POST = requestMiddleware(async ({ data }: { data: TeamLeague }) => {
  return await prisma.teamLeague.create({ data });
});
