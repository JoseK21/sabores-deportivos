/*
  Warnings:

  - You are about to drop the column `sportId` on the `Tournament` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Business" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Tournament" DROP COLUMN "sportId";
