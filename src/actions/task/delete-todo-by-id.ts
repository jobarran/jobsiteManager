'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";


export const deleteTodoById = async (todoId: string | undefined) => {
    try {
        const session = await auth();
        const userId = session?.user.id;

        if (!userId) {
            return {
                ok: false,
                message: 'There is no user logged',
            };
        }

        // Check if the todo exists
        const existingTodo = await prisma.todo.findUnique({
            where: {
                id: todoId
            }
        });

        if (!existingTodo) {
            return {
                ok: false,
                message: 'Todo with the given ID does not exist',
            };
        }

        // Delete the todo
        await prisma.todo.delete({
            where: {
                id: todoId
            }
        });

        return {
            ok: true,
            message: 'Todo deleted successfully',
        };
    } catch (error) {
        console.error('Failed to delete todo:', error);
        return {
            ok: false,
            message: 'Failed to delete todo',
        };
    }
};