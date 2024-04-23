/*
  Warnings:

  - The primary key for the `Business` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `BusinessAdvertising` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `BusinessGallery` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `BusinessScheduled` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ClaimedPrize` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `League` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Prize` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ProductPrize` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ProductType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Sport` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Team` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TeamEvent` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "BusinessAdvertising" DROP CONSTRAINT "BusinessAdvertising_idBusiness_fkey";

-- DropForeignKey
ALTER TABLE "BusinessGallery" DROP CONSTRAINT "BusinessGallery_idBusiness_fkey";

-- DropForeignKey
ALTER TABLE "BusinessScheduled" DROP CONSTRAINT "BusinessScheduled_idBusiness_fkey";

-- DropForeignKey
ALTER TABLE "ClaimedPrize" DROP CONSTRAINT "ClaimedPrize_idPrize_fkey";

-- DropForeignKey
ALTER TABLE "Forecast" DROP CONSTRAINT "Forecast_idBusiness_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_typeId_fkey";

-- DropForeignKey
ALTER TABLE "ProductPrize" DROP CONSTRAINT "ProductPrize_idPrize_fkey";

-- DropForeignKey
ALTER TABLE "ProductPrize" DROP CONSTRAINT "ProductPrize_idProduct_fkey";

-- DropForeignKey
ALTER TABLE "TeamEvent" DROP CONSTRAINT "TeamEvent_teamId_fkey";

-- DropForeignKey
ALTER TABLE "_teamEvents" DROP CONSTRAINT "_teamEvents_B_fkey";

-- AlterTable
ALTER TABLE "Business" DROP CONSTRAINT "Business_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Business_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Business_id_seq";

-- AlterTable
ALTER TABLE "BusinessAdvertising" DROP CONSTRAINT "BusinessAdvertising_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "idBusiness" SET DATA TYPE TEXT,
ADD CONSTRAINT "BusinessAdvertising_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "BusinessAdvertising_id_seq";

-- AlterTable
ALTER TABLE "BusinessGallery" DROP CONSTRAINT "BusinessGallery_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "idBusiness" SET DATA TYPE TEXT,
ADD CONSTRAINT "BusinessGallery_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "BusinessGallery_id_seq";

-- AlterTable
ALTER TABLE "BusinessScheduled" DROP CONSTRAINT "BusinessScheduled_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "idBusiness" SET DATA TYPE TEXT,
ADD CONSTRAINT "BusinessScheduled_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "BusinessScheduled_id_seq";

-- AlterTable
ALTER TABLE "ClaimedPrize" DROP CONSTRAINT "ClaimedPrize_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "idPrize" SET DATA TYPE TEXT,
ADD CONSTRAINT "ClaimedPrize_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ClaimedPrize_id_seq";

-- AlterTable
ALTER TABLE "Forecast" ALTER COLUMN "idBusiness" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "League" DROP CONSTRAINT "League_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "League_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "League_id_seq";

-- AlterTable
ALTER TABLE "Prize" DROP CONSTRAINT "Prize_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Prize_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Prize_id_seq";

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "idBussiness" SET DATA TYPE TEXT,
ALTER COLUMN "typeId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Product_id_seq";

-- AlterTable
ALTER TABLE "ProductPrize" DROP CONSTRAINT "ProductPrize_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "idPrize" SET DATA TYPE TEXT,
ALTER COLUMN "idProduct" SET DATA TYPE TEXT,
ADD CONSTRAINT "ProductPrize_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ProductPrize_id_seq";

-- AlterTable
ALTER TABLE "ProductType" DROP CONSTRAINT "ProductType_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ProductType_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ProductType_id_seq";

-- AlterTable
ALTER TABLE "Sport" DROP CONSTRAINT "Sport_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Sport_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Sport_id_seq";

-- AlterTable
ALTER TABLE "Team" DROP CONSTRAINT "Team_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Team_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Team_id_seq";

-- AlterTable
ALTER TABLE "TeamEvent" DROP CONSTRAINT "TeamEvent_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "teamId" SET DATA TYPE TEXT,
ADD CONSTRAINT "TeamEvent_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "TeamEvent_id_seq";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "idBusiness" TEXT;

-- AlterTable
ALTER TABLE "_teamEvents" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_idBusiness_fkey" FOREIGN KEY ("idBusiness") REFERENCES "Business"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "ProductType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPrize" ADD CONSTRAINT "ProductPrize_idPrize_fkey" FOREIGN KEY ("idPrize") REFERENCES "Prize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPrize" ADD CONSTRAINT "ProductPrize_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClaimedPrize" ADD CONSTRAINT "ClaimedPrize_idPrize_fkey" FOREIGN KEY ("idPrize") REFERENCES "Prize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamEvent" ADD CONSTRAINT "TeamEvent_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Forecast" ADD CONSTRAINT "Forecast_idBusiness_fkey" FOREIGN KEY ("idBusiness") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessScheduled" ADD CONSTRAINT "BusinessScheduled_idBusiness_fkey" FOREIGN KEY ("idBusiness") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessGallery" ADD CONSTRAINT "BusinessGallery_idBusiness_fkey" FOREIGN KEY ("idBusiness") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessAdvertising" ADD CONSTRAINT "BusinessAdvertising_idBusiness_fkey" FOREIGN KEY ("idBusiness") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_teamEvents" ADD CONSTRAINT "_teamEvents_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
