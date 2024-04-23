/*
  Warnings:

  - Made the column `province` on table `Business` required. This step will fail if there are existing NULL values in that column.
  - Made the column `canton` on table `Business` required. This step will fail if there are existing NULL values in that column.
  - Made the column `district` on table `Business` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Business" ALTER COLUMN "province" SET NOT NULL,
ALTER COLUMN "canton" SET NOT NULL,
ALTER COLUMN "district" SET NOT NULL;
