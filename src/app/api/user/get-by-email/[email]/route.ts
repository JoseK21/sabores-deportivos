import prisma from "@/lib/prisma";
import { requestMiddleware } from "@/middlewares/requestMiddleware";
import { pick } from "lodash";

export const GET = requestMiddleware(async ({ params }) => {
  const user = await prisma.userSystem.findFirst({ where: { email: params.email } });

  return pick(user, ["id", "name", "role", "email"]);
});
