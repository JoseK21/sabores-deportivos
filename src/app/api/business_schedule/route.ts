import prisma from "@/lib/prisma";
import { requestMiddleware } from "@/middlewares/requestMiddleware";
import { BusinessScheduled } from "@prisma/client";

export const POST = requestMiddleware(async ({ data }: { data: BusinessScheduled }) => {
  return await prisma.businessScheduled.create({ data });
});
