-- Add `slug` column to `Business` table
ALTER TABLE "Business" ADD COLUMN "slug" TEXT;

-- Add `image` column to `BusinessEvent` table
ALTER TABLE "BusinessEvent" ADD COLUMN "image" TEXT;
