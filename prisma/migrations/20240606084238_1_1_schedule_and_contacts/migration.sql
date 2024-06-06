/*
  Warnings:

  - A unique constraint covering the columns `[idBusiness]` on the table `BusinessScheduled` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "email" TEXT,
ADD COLUMN     "phone1" INTEGER,
ADD COLUMN     "phone2" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "BusinessScheduled_idBusiness_key" ON "BusinessScheduled"("idBusiness");
