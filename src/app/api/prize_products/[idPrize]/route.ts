import prisma from "@/lib/prisma";
import { requestMiddleware } from "@/middlewares/requestMiddleware";

export const GET = requestMiddleware(async ({ params }) => {
  return await prisma.productPrize.findMany({
    where: { idPrize: params.idPrize || "N/A" },
    include: { product: true },
    // orderBy: { name: "asc" },
  });
});
