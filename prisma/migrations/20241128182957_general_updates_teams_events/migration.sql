/*
  Warnings:

  - You are about to drop the column `idClient` on the `Forecast` table. All the data in the column will be lost.
  - You are about to drop the column `abbrName` on the `League` table. All the data in the column will be lost.
  - You are about to drop the column `abbrName` on the `Sport` table. All the data in the column will be lost.
  - You are about to drop the column `abbrName` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `leagueId` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `abbrName` on the `Tournament` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Tournament` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Tournament` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[homeTeamId,awayTeamId,dateTime]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idUser,idEvent]` on the table `Forecast` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idUser` to the `Forecast` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `League` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `League` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sportId` to the `Tournament` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_tournamentId_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_leagueId_fkey";

-- DropForeignKey
ALTER TABLE "Tournament" DROP CONSTRAINT "Tournament_leagueId_fkey";

-- DropIndex
DROP INDEX "Event_tournamentId_homeTeamId_awayTeamId_dateTime_key";

-- DropIndex
DROP INDEX "League_abbrName_key";

-- DropIndex
DROP INDEX "Sport_abbrName_key";

-- DropIndex
DROP INDEX "Team_leagueId_name_key";

-- DropIndex
DROP INDEX "Tournament_abbrName_key";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "awayTeamScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "homeTeamScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "leagueId" TEXT,
ALTER COLUMN "tournamentId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Forecast" DROP COLUMN "idClient",
ADD COLUMN     "idUser" TEXT NOT NULL,
ALTER COLUMN "idEvent" SET DATA TYPE TEXT,
ALTER COLUMN "status" SET DEFAULT 'pending';

-- AlterTable
ALTER TABLE "League" DROP COLUMN "abbrName",
ADD COLUMN     "enabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Sport" DROP COLUMN "abbrName";

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "abbrName",
DROP COLUMN "leagueId";

-- AlterTable
ALTER TABLE "Tournament" DROP COLUMN "abbrName",
DROP COLUMN "description",
DROP COLUMN "status",
ADD COLUMN     "sportId" TEXT NOT NULL,
ALTER COLUMN "leagueId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "TeamLeague" (
    "id" SERIAL NOT NULL,
    "teamId" TEXT NOT NULL,
    "leagueId" TEXT NOT NULL,

    CONSTRAINT "TeamLeague_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamTournament" (
    "id" SERIAL NOT NULL,
    "teamId" TEXT NOT NULL,
    "tournamentId" TEXT NOT NULL,

    CONSTRAINT "TeamTournament_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TeamLeague_teamId_leagueId_key" ON "TeamLeague"("teamId", "leagueId");

-- CreateIndex
CREATE UNIQUE INDEX "TeamTournament_teamId_tournamentId_key" ON "TeamTournament"("teamId", "tournamentId");

-- CreateIndex
CREATE UNIQUE INDEX "Event_homeTeamId_awayTeamId_dateTime_key" ON "Event"("homeTeamId", "awayTeamId", "dateTime");

-- CreateIndex
CREATE UNIQUE INDEX "Forecast_idUser_idEvent_key" ON "Forecast"("idUser", "idEvent");

-- AddForeignKey
ALTER TABLE "Tournament" ADD CONSTRAINT "Tournament_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "Sport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tournament" ADD CONSTRAINT "Tournament_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamLeague" ADD CONSTRAINT "TeamLeague_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamLeague" ADD CONSTRAINT "TeamLeague_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamTournament" ADD CONSTRAINT "TeamTournament_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamTournament" ADD CONSTRAINT "TeamTournament_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Forecast" ADD CONSTRAINT "Forecast_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Forecast" ADD CONSTRAINT "Forecast_idEvent_fkey" FOREIGN KEY ("idEvent") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
