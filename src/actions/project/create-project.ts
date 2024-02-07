'use server';

import { auth } from "@/auth.config";
import { ProjectStatus } from "@/interfaces";
import prisma from "@/lib/prisma";

interface Props {
    name: string;
    status: ProjectStatus;
    description: string
}

export const createProject = async ({name, status, description} :Props) => {

    const session = await auth();
    const userId = session?.user.id
    const userActiveCompany = session?.user.companyId

    if (!userId) {
        return {
            ok: false,
            message: 'There is no user logged',
        };
    }

    try {

        const project = await prisma.project.create({
            data: {
                name: name,
                status: status|| 'upcoming',
                description: description,
                companyId: userActiveCompany || '',
            },
            select: {
                name: true,
                status: true,
                description: true,
            }
        })

        return {
            ok: true,
            user: project,
            message: 'Project created'
        }
        
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'Cannot create Project'
        }
    }
};