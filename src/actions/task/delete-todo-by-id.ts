'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";


export const deleteTodoById = async (todoIds: string[] | undefined) => {
    try {
        const session = await auth();
        const userId = session?.user.id;

        if (!userId) {
            return {
                ok: false,
                message: 'There is no user logged',
            };
        }

        if (!todoIds || todoIds.length === 0) {
            return {
                ok: false,
                message: 'No todo IDs provided',
            };
        }

        // Check if the todo IDs exist
        const existingTodos = await prisma.todo.findMany({
            where: {
                id: {
                    in: todoIds
                }
            }
        });

        if (existingTodos.length !== todoIds.length) {
            return {
                ok: false,
                message: 'One or more todos with the given IDs do not exist',
            };
        }

        // Delete todos
        await prisma.todo.deleteMany({
            where: {
                id: {
                    in: todoIds
                }
            }
        });

        return {
            ok: true,
            message: 'Todos deleted successfully',
        };
    } catch (error) {
        console.error('Failed to delete todos:', error);
        return {
            ok: false,
            message: 'Failed to delete todos',
        };
    }
};