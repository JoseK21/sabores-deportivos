import prisma from "@/lib/prisma";
import { requestMiddleware } from "@/middlewares/requestMiddleware";
import { Business } from "@prisma/client";

export const GET = requestMiddleware(async () => {
  return await prisma.business.findMany();
});

export const POST = requestMiddleware(async ({ data }: { data: Business }) => {
  return await prisma.business.create({ data });
});
