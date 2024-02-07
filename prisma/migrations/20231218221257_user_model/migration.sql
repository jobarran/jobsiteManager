/*
  Warnings:

  - You are about to drop the `UserAvatar` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "UserAvatar" DROP CONSTRAINT "UserAvatar_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image" TEXT;

-- DropTable
DROP TABLE "UserAvatar";

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
