import { UserRole } from "@/app/enum";
import prisma from "@/lib/prisma";
import { requestMiddleware } from "@/middlewares/requestMiddleware";
import { User } from "@/types/user";

import { pick } from "lodash";

const ALLOW_ROLES_EMPLOYEE = [UserRole.cashier_rest, UserRole.waiter_rest, UserRole.bartender_rest]

export const GET = requestMiddleware(async () => {
  const employees = await prisma.user.findMany({
    where: {
      AND: [{ role: { in: ALLOW_ROLES_EMPLOYEE } }],
    },
  });

  return employees; // admins.map((admin) => pick(admin, ["id", "name", "role", "email", "status", "password"]));
});

export const POST = requestMiddleware(async ({ data }: { data: User }) => {
  if (ALLOW_ROLES_EMPLOYEE.includes(data.role)) {
    const newAdminUser = await prisma.user.create({ data });

    return newAdminUser; // pick(newAdminUser, ["id", "name", "role", "image", "status", "password"]);
  } else {
    throw new Error("UserRole must be cashier, waiter or bartender");
  }
});
