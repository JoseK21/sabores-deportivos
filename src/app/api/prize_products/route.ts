import prisma from "@/lib/prisma";
import { requestMiddleware } from "@/middlewares/requestMiddleware";

type ProductPrizeInput = {
  idPrize: string;
  productIds: string[];
};

export const POST = requestMiddleware(async ({ data }: { data: ProductPrizeInput }) => {
  const { idPrize, productIds } = data;

  const prize = await prisma.prize.findUnique({
    where: { id: idPrize },
    include: { ProductPrize: true }, // Incluye los ProductPrize relacionados
  });

  if (!prize) {
    throw new Error(`Prize with id ${idPrize} not found`);
  }

  const createdProductPrizes = await prisma.productPrize.createMany({
    data: productIds.map((idProduct: string) => ({ idPrize, idProduct })),
  });

  return createdProductPrizes;
});
