import prisma from "@/lib/prisma";
import { Prize } from "@prisma/client";
import { requestMiddleware } from "@/middlewares/requestMiddleware";

export const GET = requestMiddleware(async () => {
  return await prisma.prize.findMany({ orderBy: { name: "asc" } });
});

export const POST = requestMiddleware(async ({ data }: { data: Prize }) => {
  return await prisma.prize.create({ data });
});
