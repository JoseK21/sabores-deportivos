import prisma from "@/lib/prisma";
import { Event } from "@prisma/client";
import { requestMiddleware } from "@/middlewares/requestMiddleware";

export const GET = requestMiddleware(async () => {
  return await prisma.event.findMany({ include: { Tournament: true, League: true, HomeTeam: true, AwayTeam: true } });
});

export const POST = requestMiddleware(async ({ data }: { data: Event }) => {
  return await prisma.event.create({
    data,
    include: { Tournament: true, League: true, HomeTeam: true, AwayTeam: true },
  });
});
