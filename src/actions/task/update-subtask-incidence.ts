'use server';

import { auth } from "@/auth.config";
import { ProjectStatus, SubTask, Task } from "@/interfaces";
import prisma from "@/lib/prisma";


export const updateSubTaskIncidence = async ( subtasks:SubTask[], taskId:string | undefined) => {

    const session = await auth();
    const userId = session?.user.id


    if (!userId) {
        return {
            ok: false,
            message: 'There is no user logged',
        };
    }

    try {
        // Find the project by projectId
        const project = await prisma.task.findUnique({
            where: { id: taskId },
            include: {
                subTasks: true,
            },
        });

        if (!project) {
            return {
                ok: false,
                message: 'Task not found'
            };
        }

        // Loop through the provided tasks
        for (const newSubTask of subtasks) {
            // Find the corresponding task in the project's tasks
            const existingSubTask = project.subTasks.find(subtasks => subtasks.id === newSubTask.id);

            if (existingSubTask) {
                // Update the incidence of the existing task with the new data
                await prisma.subTask.update({
                    where: { id: existingSubTask.id },
                    data: {
                        incidence: newSubTask.incidence, // Assuming incidence is a field in your Task model
                    },
                });
            } else {
                // If the task doesn't exist, return failure
                return {
                    ok: false,
                    message: `SubTask with id ${newSubTask.id} does not exist in the project`,
                };
            }
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