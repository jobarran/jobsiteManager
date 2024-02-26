'use server'

import prisma from "@/lib/prisma"
import { UserRole } from "@prisma/client";
import bcryptjs from 'bcryptjs';
import { auth } from "@/auth.config";

interface Props {
    name: string,
    lastName: string,
    email: string,
    password: string,
    role?: UserRole,
}

export const registerUser = async ({name, lastName, email, password, role}:Props) => {

    const session = await auth();
    const userActiveCompany = session?.user.companyId

    try {

        const user = await prisma.user.create({
            data: {
                name: name,
                lastName: lastName,
                email: email.toLowerCase(),
                password: bcryptjs.hashSync(password),
                role: role ? role : 'admin',
                companyId: userActiveCompany || '',
            },
            select: {
                id: true,
                name: true,
                lastName: true,
                email: true,
                role: true,
            }
        })

        return {
            ok: true,
            user: user,
            message: 'User created'
        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'Cannot create user'
        }
    }

}