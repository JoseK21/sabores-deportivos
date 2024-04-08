import prisma from "@/lib/prisma";
import { requestMiddleware } from "@/middlewares/requestMiddleware";

import { pick } from "lodash";

export const GET = requestMiddleware(async ({ params }) => {
  const employeeUser = await prisma.user.findFirst({
    where: { id: params.id },
  });

  return employeeUser; // pick(employeeUser, ["id", "name", "role", "image", "email", "status"]);
});

export const PUT = requestMiddleware(async ({ data, params }) => {
  const employeeUser = await prisma.user.update({
    where: { id: params.id },
    data,
  });

  return employeeUser; // pick(employeeUser, ["id", "name", "role", "image", "email", "status"]);
});

export const DELETE = requestMiddleware(async ({ params }) => {
  const employeeUser = await prisma.user.delete({
    where: { id: params.id },
  });

  return employeeUser; // pick(employeeUser, ["id", "name", "role"]);
});
