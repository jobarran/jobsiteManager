-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'user');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('ongoing', 'finished', 'upcoming');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT[],
    "role" "UserRole"[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "employeeFields" TEXT[],
    "employeeRoles" TEXT[],
    "userPossitions" TEXT[],
    "userId" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "ProjectStatus"[] DEFAULT ARRAY[]::"ProjectStatus"[],
    "companyId" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Project_status_idx" ON "Project"("status");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Create a new column with the desired type
ALTER TABLE "User"
ADD COLUMN "new_role" "UserRole";

-- Update the new column based on the values in the old column
UPDATE "User"
SET "new_role" = 'user'::"UserRole"
WHERE 'user' = ANY("role");

UPDATE "User"
SET "new_role" = 'admin'::"UserRole"
WHERE 'admin' = ANY("role");

-- Add additional cases for other possible values if needed

-- Drop the old column
ALTER TABLE "User"
DROP COLUMN "role";

-- Rename the new column to the original column name
ALTER TABLE "User"
RENAME COLUMN "new_role" TO "role";
