'use server';

import { auth } from "@/auth.config";
import { ProjectStatus } from "@/interfaces";
import prisma from "@/lib/prisma";

interface Props {
    name: string;
    status: ProjectStatus,
    description: string,
    leaderId: string | null,
    location: string,
    shortName: string
}

export const createProject = async ({name, status, description, leaderId, location, shortName} :Props) => {

    const session = await auth();
    const userId = session?.user.id
    const userActiveCompany = session?.user.companyId
    const leader = session?.user.id


    if (!userId) {
        return {
            ok: false,
            message: 'There is no user logged',
        };
    }

    try {

        const project = await prisma.project.create({
            data: {
                name,
                status: status|| 'upcoming',
                description,
                location,
                shortName,
                companyId: userActiveCompany || '',
                leaderId: leaderId || null 
            },
            select: {
                name: true,
                status: true,
                description: true,
                leader: true,
                location: true,
                shortName: true
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