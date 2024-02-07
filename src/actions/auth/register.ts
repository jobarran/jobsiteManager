'use server'

import prisma from "@/lib/prisma"
import bcryptjs from 'bcryptjs';



export const registerUser = async (name: string, lastName: string,  email: string, password: string) => {

    try {

        const user = await prisma.user.create({
            data: {
                name: name,
                lastName: lastName,
                email: email.toLowerCase(),
                password: bcryptjs.hashSync( password ),
                role: 'admin'
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