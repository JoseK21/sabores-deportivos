/*
  Warnings:

  - You are about to drop the column `description` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `leagueId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `sportId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `team1Score` on the `Forecast` table. All the data in the column will be lost.
  - You are about to drop the column `team2Score` on the `Forecast` table. All the data in the column will be lost.
  - You are about to drop the `TeamEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_teamEvents` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[tournamentId,startDate]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `awayTeamId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `homeTeamId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tournamentId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `awayTeamScore` to the `Forecast` table without a default value. This is not possible if the table is not empty.
  - Added the required column `homeTeamScore` to the `Forecast` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TournamentStatus" AS ENUM ('upcoming', 'ongoing', 'completed', 'cancelled');

-- DropForeignKey
ALTER TABLE "TeamEvent" DROP CONSTRAINT "TeamEvent_eventId_fkey";

-- DropForeignKey
ALTER TABLE "TeamEvent" DROP CONSTRAINT "TeamEvent_teamId_fkey";

-- DropForeignKey
ALTER TABLE "_teamEvents" DROP CONSTRAINT "_teamEvents_A_fkey";

-- DropForeignKey
ALTER TABLE "_teamEvents" DROP CONSTRAINT "_teamEvents_B_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "description",
DROP COLUMN "leagueId",
DROP COLUMN "sportId",
DROP COLUMN "startTime",
ADD COLUMN     "awayTeamId" TEXT NOT NULL,
ADD COLUMN     "homeTeamId" TEXT NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "tournamentId" TEXT NOT NULL,
ALTER COLUMN "title" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Forecast" DROP COLUMN "team1Score",
DROP COLUMN "team2Score",
ADD COLUMN     "awayTeamScore" INTEGER NOT NULL,
ADD COLUMN     "homeTeamScore" INTEGER NOT NULL;

-- DropTable
DROP TABLE "TeamEvent";

-- DropTable
DROP TABLE "_teamEvents";

-- CreateTable
CREATE TABLE "Tournament" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "abbrName" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "sportId" TEXT NOT NULL,
    "leagueId" TEXT NOT NULL,
    "status" "TournamentStatus" NOT NULL,

    CONSTRAINT "Tournament_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tournament_name_key" ON "Tournament"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tournament_abbrName_key" ON "Tournament"("abbrName");

-- CreateIndex
CREATE UNIQUE INDEX "Event_tournamentId_startDate_key" ON "Event"("tournamentId", "startDate");

-- AddForeignKey
ALTER TABLE "Tournament" ADD CONSTRAINT "Tournament_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "Sport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tournament" ADD CONSTRAINT "Tournament_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
