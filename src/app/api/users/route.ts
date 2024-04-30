import prisma from "@/lib/prisma";
import { requestMiddleware } from "@/middlewares/requestMiddleware";
import { User } from "@/types/user";

import { pick } from "lodash";

// export const GET = requestMiddleware(async () => {
//   // const users = await prisma.user.findMany();

//   // return users.map((user) => pick(user, ["id", "name", "role", "email", "image"]));

//   return null;
// });

// export const POST = requestMiddleware(async ({ data }: { data: User }) => {
//   // const newuser = await prisma.user.create({ data });

//   // return pick(newuser, ["id", "name", "role", "email", "image"]);

//   return null;
// });

