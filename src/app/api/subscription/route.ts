import prisma from "@/lib/prisma";
import { Subscription } from "@prisma/client";
import { requestMiddleware } from "@/middlewares/requestMiddleware";

export const POST = requestMiddleware(async ({ data }: { data: Subscription }) => {
  return await prisma.subscription.create({ data });
});
