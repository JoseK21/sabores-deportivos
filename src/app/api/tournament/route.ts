import prisma from "@/lib/prisma";
import { Tournament } from "@prisma/client";
import { requestMiddleware } from "@/middlewares/requestMiddleware";

export const GET = requestMiddleware(async () => {
  return await prisma.tournament.findMany({ include: { Sport: true } });
});

export const POST = requestMiddleware(async ({ data }: { data: Tournament }) => {
  return await prisma.tournament.create({ data });
});
