import { UserRole } from "@/app/enum";
import prisma from "@/lib/prisma";
import { requestMiddleware } from "@/middlewares/requestMiddleware";
import { User } from "@/types/user";

import { pick } from "lodash";

export const GET = requestMiddleware(async () => {
  const admins = await prisma.user.findMany({
    where: {
      role: UserRole.admin_rest,
    },
  });

  return admins; // admins.map((admin) => pick(admin, ["id", "name", "role", "email", "status", "password"]));
});

export const POST = requestMiddleware(async ({ data }: { data: User }) => {
  if (data.role === UserRole.admin_rest) {
    const newAdminUser = await prisma.user.create({ data });

    return newAdminUser; // pick(newAdminUser, ["id", "name", "role", "image", "status", "password"]);
  } else {
    throw new Error("UserRole must be admin");
  }
});
