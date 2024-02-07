/*
  Warnings:

  - Added the required column `end` to the `Subtask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `Subtask` table without a default value. This is not possible if the table is not empty.
  - Made the column `priority` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Subtask" ADD COLUMN     "end" TEXT NOT NULL,
ADD COLUMN     "priority" "TaskPriority" NOT NULL DEFAULT 'normal',
ADD COLUMN     "start" TEXT NOT NULL,
ADD COLUMN     "status" "ProjectStatus" NOT NULL DEFAULT 'upcoming';

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "priority" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL;
