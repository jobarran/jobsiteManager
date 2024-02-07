'use server';

import { auth } from "@/auth.config";
import { ProjectStatus, SubTask } from "@/interfaces";
import prisma from "@/lib/prisma";

export const createSubTask = async (data:SubTask) => {

    const session = await auth();
    const userId = session?.user.id

    if (!userId) {
        return {
            ok: false,
            message: 'There is no user logged',
        };
    }

    try {

        const subTask = await prisma.subTask.create({
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
                taskId: data.taskId,
            },
        })

        return {
            ok: true,
            subTask: subTask,
            message: 'SubTask created'
        }
        
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'Cannot create sub task'
        }
    }
};