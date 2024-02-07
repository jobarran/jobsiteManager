/*
  Warnings:

  - The `end` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `start` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "end",
ADD COLUMN     "end" TIMESTAMP(3),
DROP COLUMN "start",
ADD COLUMN     "start" TIMESTAMP(3);
