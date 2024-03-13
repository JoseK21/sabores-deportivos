import prisma from "@/lib/prisma";
import { requestMiddleware } from "@/middlewares/requestMiddleware";

import { pick } from "lodash";

export const GET = requestMiddleware(async ({ params }) => {
  const user = await prisma.user.findFirst({
    where: { id: Number(params.id) },
  });

  return pick(user, ["id", "name", "role", "imageUrl", "email"]);
});

export const PUT = requestMiddleware(async ({ data, params }) => {
  const user = await prisma.user.update({
    where: { id: Number(params.id) },
    data,
  });

  return pick(user, ["id", "name", "role", "imageUrl", "email"]);
});

export const DELETE = requestMiddleware(async ({ params }) => {
  const user = await prisma.user.delete({
    where: { id: Number(params.id) },
  });

  return pick(user, ["id", "name", "role", "imageUrl"]);
});
