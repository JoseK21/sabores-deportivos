import { UserRole } from "@/app/enum";
import prisma from "@/lib/prisma";
import { requestMiddleware } from "@/middlewares/requestMiddleware";
import { isEmpty } from "lodash";

export const GET = requestMiddleware(async ({ params }) => {
  const decodedEmail = decodeURIComponent(params.email);

  const user = await prisma.user.findFirst({
    where: { email: decodedEmail },
  });

  return { isClient: user?.role === UserRole.client, isEmailFound: !isEmpty(user) };
});
