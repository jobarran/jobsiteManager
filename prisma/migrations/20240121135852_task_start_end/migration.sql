/*
  Warnings:

  - You are about to drop the column `end` on the `Subtask` table. All the data in the column will be lost.
  - You are about to drop the column `start` on the `Subtask` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Subtask" DROP COLUMN "end",
DROP COLUMN "start";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "end" TEXT,
ADD COLUMN     "start" TEXT;
