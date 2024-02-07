'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const createCompany = async (companyName: string, userId: string) => {
    const session = await auth();
    const userActiveCompany = session?.user.companyId

    if (!userId) {
        return {
            ok: false,
            message: 'There is no user logged',
        };
    }

    if ( userActiveCompany ) {
        return {
            ok: false,
            message: 'Already has a company',
        };
    }

    // Create DB transaction
    try {
        const prismaTx = await prisma.$transaction(async (tx) => {
            // 1. Create Company
            const company = await prisma.company.create({
                data: {
                    name: companyName,
                    userId: userId,
                },
            });

            // 2. Set activeCompany to admin user
            const userActiveCompany = await prisma.user.update({
                where: { id: userId },
                data: {
                    companyId: company.id, // Move companyId inside data
                },
            });

            return {
                ok: true,
                company: company,
                message: 'Company created',
            };
        });

        return {
            ok: true,
            order: prismaTx.company,
            prismaTx: prismaTx,
        };
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'Cannot create company',
        };
    }
};