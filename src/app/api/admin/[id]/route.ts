import prisma from "@/lib/prisma";
import { requestMiddleware } from "@/middlewares/requestMiddleware";

import { pick } from "lodash";

export const GET = requestMiddleware(async ({ params }) => {
  const adminUser = await prisma.user.findFirst({
    where: { id: params.id },
  });

  return adminUser; // pick(adminUser, ["id", "name", "role", "image", "email", "status"]);
});

export const PUT = requestMiddleware(async ({ data, params }) => {
  const adminUser = await prisma.user.update({
    where: { id: params.id },
    data,
  });

  return adminUser; // pick(adminUser, ["id", "name", "role", "image", "email", "status"]);
});

export const DELETE = requestMiddleware(async ({ params }) => {
  const adminUser = await prisma.user.delete({
    where: { id: params.id },
  });

  return adminUser; // pick(adminUser, ["id", "name", "role"]);
});
