/*
  Warnings:

  - A unique constraint covering the columns `[leagueId,name]` on the table `Team` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Team_abbrName_key";

-- DropIndex
DROP INDEX "Team_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Team_leagueId_name_key" ON "Team"("leagueId", "name");
