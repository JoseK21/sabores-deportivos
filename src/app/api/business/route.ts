import { UserRole } from "@/app/enum";
import prisma from "@/lib/prisma";
import { requestMiddleware } from "@/middlewares/requestMiddleware";
import { Business } from "@/types/business";

import { pick } from "lodash";

export const GET = requestMiddleware(async () => {
  const admins = await prisma.business.findMany();

  return admins; // admins.map((admin) => pick(admin, ["id", "name", "role", "email", "status", "password"]));
});

export const POST = requestMiddleware(async ({ data }: { data: Business }) => {
  const newAdminUser = await prisma.business.create({ data });

  return newAdminUser; // pick(newAdminUser, ["id", "name", "role", "image", "status", "password"]);
});
