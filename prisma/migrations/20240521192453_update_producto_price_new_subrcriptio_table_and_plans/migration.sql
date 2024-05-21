-- CreateEnum
CREATE TYPE "BusinessPlan" AS ENUM ('basic', 'intermediate', 'premium');

-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "plan" "BusinessPlan" NOT NULL DEFAULT 'basic';

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "Supcription" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Supcription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Supcription_email_key" ON "Supcription"("email");
