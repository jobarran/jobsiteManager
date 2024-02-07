/*
  Warnings:

  - You are about to drop the `CompanyLogo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CompanyLogo" DROP CONSTRAINT "CompanyLogo_companyId_fkey";

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "image" TEXT;

-- DropTable
DROP TABLE "CompanyLogo";
