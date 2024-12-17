import prisma from "@/lib/prisma";
import { requestMiddleware } from "@/middlewares/requestMiddleware";

export const GET = requestMiddleware(async ({ params }) => {
  const decodedEmail = decodeURIComponent(params.email);

  const user = await prisma.user.findFirst({
    where: { email: decodedEmail },
  });

  return { totalPoints: user?.totalPoints, claimedPoints: user?.claimedPoints };
});
