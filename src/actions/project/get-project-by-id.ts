'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';



export const getProjectById = async (id: string) => {

    const session = await auth();

    if (!session?.user) {
        return {
            ok: false,
            message: 'User must be logged in'
        }
    }


    try {

        const project = await prisma.project.findUnique({
            where: { id } });

        if (!project) throw `Cant find ${id}`;

        return {
            ok: true,
            project: project,
        }


    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'Cannot find order'
        }

    }




}