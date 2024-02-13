'use server';

import { auth } from "@/auth.config";
import { ProjectStatus, Task } from "@/interfaces";
import prisma from "@/lib/prisma";


export const updateTaskIncidence = async (tasks: Task[], projectId: string | undefined) => {

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
        const project = await prisma.project.findUnique({
            where: { id: projectId },
            include: {
                tasks: true,
            },
        });

        if (!project) {
            return {
                ok: false,
                message: 'Project not found'
            };
        }

        // Loop through the provided tasks
        for (const newTask of tasks) {
            // Find the corresponding task in the project's tasks
            const existingTask = project.tasks.find(task => task.id === newTask.id);

            if (existingTask) {
                // Update the incidence of the existing task with the new data
                await prisma.task.update({
                    where: { id: existingTask.id },
                    data: {
                        incidence: newTask.incidence, // Assuming incidence is a field in your Task model
                    },
                });
            } else {
                // If the task doesn't exist, return failure
                return {
                    ok: false,
                    message: `Task with id ${newTask.id} does not exist in the project`,
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