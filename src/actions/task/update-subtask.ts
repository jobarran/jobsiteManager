'use server';

import { auth } from "@/auth.config";
import { ProjectStatus, SubTask, Task } from "@/interfaces";
import prisma from "@/lib/prisma";


export const updateSubTask = async ( subtask:SubTask, taskId:string | undefined) => {

    const session = await auth();
    const userId = session?.user.id


    if (!userId) {
        return {
            ok: false,
            message: 'There is no user logged',
        };
    }

    try {
        const task = await prisma.task.findUnique({
            where: { id: taskId },
            include: {
                subTasks: true,
            },
        });

        if (!task) {
            return {
                ok: false,
                message: 'Task not found'
            };
        }

        const existingSubTask = await prisma.subTask.findUnique({
            where: { id: subtask.id },
        });

        if (existingSubTask) {
            // Update the incidence of the existing task with the new data
            await prisma.subTask.update({
                where: { id: existingSubTask.id },
                data: {
                    progress: subtask.progress, // Assuming incidence is a field in your Task model
                },
            });
        } else {
            // If the task doesn't exist, return failure
            return {
                ok: false,
                message: `SubTask with id ${subtask.id} does not exist in the project`,
            };
        }

        return {
            ok: true,
            message: 'Tasks updated successfully'
        };

    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: 'Failed to update tasks'
        };
    }
};