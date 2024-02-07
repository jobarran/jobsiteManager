/*
  Warnings:

  - Made the column `status` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'ongoing';

-- CreateIndex
CREATE INDEX "Project_status_idx" ON "Project"("status");
