/*
  Warnings:

  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('client', 'master', 'admin_rest', 'cashier_rest', 'waiter_rest', 'bartender_rest');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('actived', 'suspented', 'deactivated');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'deactivated',
DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'client';

-- DropEnum
DROP TYPE "Role";
