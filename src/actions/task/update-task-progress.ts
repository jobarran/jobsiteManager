'use server';

import { auth } from "@/auth.config";
import { ProjectStatus, Task } from "@/interfaces";
import prisma from "@/lib/prisma";


export const updateTaskProgress = async (progress: string, taskId: string | undefined,  projectId: string | undefined) => {

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

        if (taskId) {
            // Update the incidence of the existing task with the new data
            await prisma.task.update({
                where: { id: taskId },
                data: {
                    progress: progress, // Assuming incidence is a field in your Task model
                },
            });
        } else {
            // If the task doesn't exist, return failure
            return {
                ok: false,
                message: `Cant found Task with id ${taskId} does not exist in the project`,
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