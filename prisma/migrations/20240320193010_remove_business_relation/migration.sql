/*
  Warnings:

  - You are about to drop the column `businessId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_businessId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "businessId";
