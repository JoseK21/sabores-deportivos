/*
  Warnings:

  - You are about to drop the column `startDate` on the `Event` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tournamentId,homeTeamId,awayTeamId,dateTime]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dateTime` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Event_tournamentId_startDate_key";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "startDate",
ADD COLUMN     "dateTime" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Event_tournamentId_homeTeamId_awayTeamId_dateTime_key" ON "Event"("tournamentId", "homeTeamId", "awayTeamId", "dateTime");
