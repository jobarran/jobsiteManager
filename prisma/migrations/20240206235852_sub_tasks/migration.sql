/*
  Warnings:

  - You are about to drop the `Subtask` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Subtask" DROP CONSTRAINT "Subtask_taskId_fkey";

-- DropTable
DROP TABLE "Subtask";

-- CreateTable
CREATE TABLE "SubTask" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "progress" TEXT NOT NULL,
    "incidence" TEXT NOT NULL,
    "contractor" TEXT NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "priority" "TaskPriority" NOT NULL DEFAULT 'normal',
    "status" "ProjectStatus" NOT NULL DEFAULT 'upcoming',
    "description" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,

    CONSTRAINT "SubTask_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubTask" ADD CONSTRAINT "SubTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
