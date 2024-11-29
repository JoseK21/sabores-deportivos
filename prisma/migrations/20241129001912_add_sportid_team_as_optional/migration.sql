/*
  Warnings:

  - A unique constraint covering the columns `[name,sportId]` on the table `Team` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "sportId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Team_name_sportId_key" ON "Team"("name", "sportId");

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "Sport"("id") ON DELETE SET NULL ON UPDATE CASCADE;
