-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "abbrName" DROP NOT NULL,
ALTER COLUMN "logoUrl" DROP NOT NULL,
ALTER COLUMN "colors" DROP NOT NULL,
ALTER COLUMN "colors" SET DATA TYPE TEXT;
