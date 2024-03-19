import prisma from "@/lib/prisma";
import { requestMiddleware } from "@/middlewares/requestMiddleware";
import { User } from "@/types/user";
import { UserSystem } from "@prisma/client";

import { pick } from "lodash";

export const GET = requestMiddleware(async () => {
  const users = await prisma.userSystem.findMany();

  return users.map((user) => pick(user, ["id", "name", "role", "email"]));
});

export const POST = requestMiddleware(async ({ data }: { data: UserSystem }) => {
  const newuser = await prisma.userSystem.create({ data });

  return pick(newuser, ["id", "name", "role", "imageUrl"]);
});
