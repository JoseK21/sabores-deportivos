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

  return admins.map((admin) => pick(admin, ["id", "name", "role", "email"]));
});

export const POST = requestMiddleware(async ({ data }: { data: User }) => {
  if (data.role === UserRole.admin_rest) {
    const newuser = await prisma.user.create({ data });

    return pick(newuser, ["id", "name", "role", "imageUrl"]);
  } else {
    throw new Error("UserRole must be admin");
  }
});
