import prisma from "@/lib/prisma";
import { requestMiddleware } from "@/middlewares/requestMiddleware";

export const GET = requestMiddleware(async ({ params }) => {
  return await prisma.prize.findMany({
    where: { idBusiness: params.idBusiness || "N/A" },
    orderBy: { name: "asc" },
    include: { ProductPrize: true },
  });
});
