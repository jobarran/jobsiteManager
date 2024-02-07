/*
  Warnings:

  - Made the column `end` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `start` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "TaskPriority" AS ENUM ('normal', 'high', 'urgent');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "priority" "TaskPriority" DEFAULT 'normal',
ADD COLUMN     "status" "ProjectStatus" DEFAULT 'upcoming',
ALTER COLUMN "end" SET NOT NULL,
ALTER COLUMN "start" SET NOT NULL;
