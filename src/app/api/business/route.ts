import prisma from "@/lib/prisma";
import { Business } from "@prisma/client";
import { requestMiddleware } from "@/middlewares/requestMiddleware";

export const GET = requestMiddleware(async () => {
  return await prisma.business.findMany({include: { BusinessScheduled: true }});
});

export const POST = requestMiddleware(async ({ data }: { data: Business }) => {
  return await prisma.business.create({ data });
});
