import prisma from "@/lib/prisma";
import { requestMiddleware } from "@/middlewares/requestMiddleware";

export const GET = requestMiddleware(async ({ params }) => {
  return await prisma.event.findFirst({
    where: { id: params.id },
    include: { Tournament: true, homeTeam: true, awayTeam: true },
  });
});

export const PUT = requestMiddleware(async ({ data, params }) => {
  return await prisma.event.update({
    where: { id: params.id },
    data,
    include: { Tournament: true, homeTeam: true, awayTeam: true },
  });
});

export const DELETE = requestMiddleware(async ({ params }) => {
  return await prisma.event.delete({
    where: { id: params.id },
    include: { Tournament: true, homeTeam: true, awayTeam: true },
  });
});
