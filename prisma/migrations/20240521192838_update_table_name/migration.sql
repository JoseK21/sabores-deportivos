/*
  Warnings:

  - You are about to drop the `Supcription` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Supcription";

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_email_key" ON "Subscription"("email");
