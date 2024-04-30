import prisma from "@/lib/prisma";
import { requestMiddleware } from "@/middlewares/requestMiddleware";

export const GET = requestMiddleware(async ({ params }) => {
  return await prisma.product.findMany({
    where: { idBusiness: params.idBusiness || "N/A" },
    orderBy: { name: "asc" },
    include: { productType: true },
  });
});
