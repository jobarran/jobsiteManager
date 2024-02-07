'use server';

import { auth } from "@/auth.config";
import { ProjectStatus, Task } from "@/interfaces";
import prisma from "@/lib/prisma";

export const createTask = async (data: Task) => {

    const session = await auth();
    const userId = session?.user.id


    if (!userId) {
        return {
            ok: false,
            message: 'There is no user logged',
        };
    }

    try {

        const task = await prisma.task.create({
            data: {
                name: data.name,
                location: data.location,
                description: data.description,
                incidence: data.incidence,
                contractor: data.contractor,
                progress: data.progress,
                start: data.start,
                end: data.end,
                priority: data.priority || 'normal',
                status: data.status || 'upcoming',
                projectId: data.projectId || '',
            },
            select: {
                name: true,
                contractor: true,
                description: true,
            }
        })

        return {
            ok: true,
            user: task,
            message: 'Task created'
        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'Cannot create Project'
        }
    }
};