'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';



export const getTaskById = async (id: string) => {

    const session = await auth();

    if (!session?.user) {
        return {
            ok: false,
            message: 'User must be logged in'
        }
    }


    try {

        const task = await prisma.task.findUnique({
            where: { id: id },
            include: {
                subTasks: true,
            },
        });

        if (!task) throw `Cant find task with project id: ${id}`;

        return {
            ok: true,
            task: task,
        }



    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'Cannot find task'
        }

    }

}