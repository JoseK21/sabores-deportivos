import prisma from "@/lib/prisma";
import { Event } from "@prisma/client";
import { requestMiddleware } from "@/middlewares/requestMiddleware";

export const GET = requestMiddleware(async () => {
  return await prisma.event.findMany({ include: { Tournament: true, homeTeam: true, awayTeam: true } });
});

export const POST = requestMiddleware(async ({ data }: { data: Event }) => {
  return await prisma.event.create({ data });
});
