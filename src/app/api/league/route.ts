import prisma from "@/lib/prisma";
import { League } from "@prisma/client";
import { requestMiddleware } from "@/middlewares/requestMiddleware";

export const GET = requestMiddleware(async () => {
  return await prisma.league.findMany({ include: { Sport: true } });
});

export const POST = requestMiddleware(async ({ data }: { data: League }) => {
  return await prisma.league.create({ data, include: { Sport: true } });
});
