import prisma from "@/lib/prisma";
import { Sport } from "@prisma/client";
import { requestMiddleware } from "@/middlewares/requestMiddleware";

export const GET = requestMiddleware(async () => {
  return await prisma.sport.findMany();
});

export const POST = requestMiddleware(async ({ data }: { data: Sport }) => {
  return await prisma.sport.create({ data });
});
