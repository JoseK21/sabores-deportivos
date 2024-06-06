import prisma from "@/lib/prisma";
import { requestMiddleware } from "@/middlewares/requestMiddleware";

export const GET = requestMiddleware(async ({ params }) => {
  return await prisma.business.findFirst({
    where: { id: params.id },
    include: { BusinessGallery: true, BusinessScheduled: true },
  });
});

export const PUT = requestMiddleware(async ({ data, params }) => {
  return await prisma.business.update({
    where: { id: params.id },
    data,
    include: { BusinessGallery: true, BusinessScheduled: true },
  });
});

export const DELETE = requestMiddleware(async ({ params }) => {
  return await prisma.business.delete({
    where: { id: params.id },
    include: { BusinessGallery: true, BusinessScheduled: true },
  });
});
