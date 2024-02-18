'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';



export const getProjectTasksById = async (id: string) => {

    const session = await auth();

    if (!session?.user) {
        return {
            ok: false,
            message: 'User must be logged in'
        }
    }


    try {

        const tasks = await prisma.task.findMany({
            where: { projectId: id },
            include: {
                subTasks: {
                    include: {
                        todos: true
                    }
                },
            },
        });

        if (!tasks.length) throw `Cant find task with project id: ${id}`;
        return {
            ok: true,
            tasks: tasks,
        }



    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'Cannot find tasks'
        }

    }

}