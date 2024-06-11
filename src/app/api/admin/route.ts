import prisma from "@/lib/prisma";
import { UserRole } from "@/app/enum";
import { User } from "@prisma/client";
import { requestMiddleware } from "@/middlewares/requestMiddleware";

export const GET = requestMiddleware(async () => {
  return await prisma.user.findMany({ where: { role: UserRole.admin_rest } });
});

export const POST = requestMiddleware(async ({ data }: { data: User }) => {
  if (data.role === UserRole.admin_rest) {
    return await prisma.user.create({ data });
  } else {
    throw new Error("UserRole must be admin");
  }
});
