/*
  Warnings:

  - A unique constraint covering the columns `[name,sportId]` on the table `League` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sportId` to the `League` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tournament" DROP CONSTRAINT "Tournament_sportId_fkey";

-- AlterTable
ALTER TABLE "League" ADD COLUMN     "sportId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "League_name_sportId_key" ON "League"("name", "sportId");

-- AddForeignKey
ALTER TABLE "League" ADD CONSTRAINT "League_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "Sport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
