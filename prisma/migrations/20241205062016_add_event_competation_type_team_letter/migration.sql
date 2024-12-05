/*
  Warnings:

  - Added the required column `competitionType` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EventCompetitionType" AS ENUM ('league', 'tournament');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "competitionType" "EventCompetitionType" NOT NULL;
