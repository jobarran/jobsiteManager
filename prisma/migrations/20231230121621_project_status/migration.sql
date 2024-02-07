

-- Create a temporary column with the new type
ALTER TABLE "Project" ADD COLUMN "status_temp" "ProjectStatus";

-- Update the new column with the values from the old column
UPDATE "Project" SET "status_temp" = "status"::text::"ProjectStatus";

-- Drop the old column
ALTER TABLE "Project" DROP COLUMN "status";

-- Rename the new column to the original name
ALTER TABLE "Project" RENAME COLUMN "status_temp" TO "status";