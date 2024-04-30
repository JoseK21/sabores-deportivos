import { UserRole } from "@/app/enum";
import prisma from "@/lib/prisma";
import { requestMiddleware } from "@/middlewares/requestMiddleware";

const ALLOW_ROLES_EMPLOYEE = [UserRole.cashier_rest, UserRole.waiter_rest, UserRole.bartender_rest];

export const GET = requestMiddleware(async ({ params }) => {
  const employees = await prisma.user.findMany({
    where: {
      idBusiness: params.idBusiness || "N/A",
      AND: [{ role: { in: ALLOW_ROLES_EMPLOYEE } }],
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      status: true,
      role: true,
      idBusiness: true,
    },
  });

  return employees;
});
