import prisma from "@/lib/prisma";
import { requestMiddleware } from "@/middlewares/requestMiddleware";

export const GET = requestMiddleware(async ({ params }) => {
  return await prisma.business.findFirst({
    where: { id: params.id },
    include: {
      BusinessGallery: true,
      BusinessScheduled: true,
      Prize: { include: { ProductPrize: { include: { product: true } } } },
      Product: { include: { productType: true }, where: { enabled: true } },
    },
  });
});
