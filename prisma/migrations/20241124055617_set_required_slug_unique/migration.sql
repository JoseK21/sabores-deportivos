/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Business` will be added. If there are existing duplicate values, this will fail.
  - Made the column `slug` on table `Business` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Business" ALTER COLUMN "slug" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Business_slug_key" ON "Business"("slug");
