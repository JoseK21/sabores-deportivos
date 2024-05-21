import prisma from "@/lib/prisma";
import { requestMiddleware } from "@/middlewares/requestMiddleware";

export const GET = requestMiddleware(async ({ params }) => {
  return await prisma.subscription.findFirst({ where: { email: params.email } });
});

export const DELETE = requestMiddleware(async ({ params }) => {
  return await prisma.subscription.delete({ where: { email: params.email } });
});
