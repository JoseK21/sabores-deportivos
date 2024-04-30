/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `BusinessAdvertising` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `BusinessGallery` table. All the data in the column will be lost.
  - You are about to drop the column `idBussiness` on the `Prize` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Prize` table. All the data in the column will be lost.
  - You are about to drop the column `idBussiness` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `typeId` on the `Product` table. All the data in the column will be lost.
  - Added the required column `image` to the `BusinessAdvertising` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `BusinessGallery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idBusiness` to the `Prize` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Prize` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idBusiness` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productTypeId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_typeId_fkey";

-- DropIndex
DROP INDEX "Product_typeId_key";

-- AlterTable
ALTER TABLE "BusinessAdvertising" DROP COLUMN "imageUrl",
ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BusinessGallery" DROP COLUMN "imageUrl",
ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Prize" DROP COLUMN "idBussiness",
DROP COLUMN "imageUrl",
ADD COLUMN     "idBusiness" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "idBussiness",
DROP COLUMN "imageUrl",
DROP COLUMN "typeId",
ADD COLUMN     "idBusiness" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "productTypeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productTypeId_fkey" FOREIGN KEY ("productTypeId") REFERENCES "ProductType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_idBusiness_fkey" FOREIGN KEY ("idBusiness") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prize" ADD CONSTRAINT "Prize_idBusiness_fkey" FOREIGN KEY ("idBusiness") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
