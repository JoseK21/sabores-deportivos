import prisma from "@/lib/prisma";
import { Team } from "@prisma/client";
import { requestMiddleware } from "@/middlewares/requestMiddleware";

export const GET = requestMiddleware(async () => {
  return await prisma.team.findMany();
});

export const POST = requestMiddleware(async ({ data }: { data: Team }) => {
  return await prisma.team.create({ data });
});
