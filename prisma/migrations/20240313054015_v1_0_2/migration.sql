/*
  Warnings:

  - The values [client] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('master', 'admin_rest', 'cashier_rest', 'waiter_rest');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- AlterTable
ALTER TABLE "BusinessAdvertising" ALTER COLUMN "enabled" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Prize" ALTER COLUMN "enabled" SET DEFAULT true;
