/*
  Warnings:

  - You are about to drop the column `idUserS` on the `ClaimedPrize` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Prize` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Prize` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Prize` table. All the data in the column will be lost.
  - Added the required column `idUserStaff` to the `ClaimedPrize` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `ProductPrize` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ClaimedPrize" DROP COLUMN "idUserS",
ADD COLUMN     "idUserStaff" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Prize" DROP COLUMN "endDate",
DROP COLUMN "image",
DROP COLUMN "startDate",
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProductPrize" ADD COLUMN     "amount" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ClaimedPrize" ADD CONSTRAINT "ClaimedPrize_idUserStaff_fkey" FOREIGN KEY ("idUserStaff") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
