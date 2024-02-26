/*
  Warnings:

  - Added the required column `end` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortName` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project"
ADD COLUMN "end" TEXT DEFAULT 'Unknown' NOT NULL,
ADD COLUMN "leaderId" TEXT,
ADD COLUMN "location" TEXT DEFAULT 'Unknown' NOT NULL,
ADD COLUMN "shortName" TEXT DEFAULT 'Unknown' NOT NULL;

-- Update Existing Data (if necessary)
-- You may need to customize this update query based on your application's requirements
UPDATE "Project" SET "end" = 'Unknown' WHERE "end" IS NULL;
UPDATE "Project" SET "location" = 'Unknown' WHERE "location" IS NULL;
UPDATE "Project" SET "shortName" = 'Unknown' WHERE "shortName" IS NULL;

-- AddForeignKey
ALTER TABLE "Project"
ADD CONSTRAINT "Project_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;