/*
  Warnings:

  - You are about to drop the column `displayProductPrize` on the `Business` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Business" DROP COLUMN "displayProductPrize",
ADD COLUMN     "displayProductPrice" BOOLEAN NOT NULL DEFAULT false;
