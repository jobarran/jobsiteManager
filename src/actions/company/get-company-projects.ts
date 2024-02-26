'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';



export const getCompanyProjects = async () => {

    const session = await auth();

    if (!session?.user) {
        return {
            ok: false,
            message: 'You must be registered',
        }
    }

    try {

        const company = await prisma.company.findUnique({
            where: { id: session.user.companyId },
            include: {
                projects: {
                    select: {
                        name: true,
                        location: true,
                        end: true,
                        status: true,
                        id: true,
                        tasks: {
                            select: {
                                id: true,
                                name: true,
                                incidence: true,
                                subTasks: {
                                    select: {
                                        incidence: true,
                                        progress: true
                                    }
                                }
                            }
                        },
                        leader: {
                            select: {
                                id: true,
                                name: true,
                                lastName: true,
                                role: true
                            }
                        }
                    }
                }
            }
        });

        if (!company) {
            throw new Error('Company not found');
        }

        const projects = company.projects;

        return {
            ok: true,
            projects: projects
        }

    } catch (error) {
        return {
            ok: false,
            message: 'Cant get projects',
        }
    }




}