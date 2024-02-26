'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';



export const getCompanyUsers = async () => {

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
                users: {
                    select: {
                        id: true,
                        name: true,
                        lastName: true,
                        role: true
                    }
                }
            }
        });

        if (!company) {
            throw new Error('Company not found');
        }

        const users = company.users;

        return {
            ok: true,
            users: users
        }

    } catch (error) {
        return {
            ok: false,
            message: 'Cant get users',
        }
    }




}