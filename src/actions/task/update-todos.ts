'use server';

import { auth } from "@/auth.config";
import { ProjectStatus, SubTask, Task, Todo } from "@/interfaces";
import prisma from "@/lib/prisma";


export const updateTodos = async (todos: Todo[]) => {

    console.log(todos)
    
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
        return {
            ok: false,
            message: 'There is no user logged',
        };
    }

    try {
        // Iterate through each todo and update it in the database
        for (const todo of todos) {
            await prisma.todo.update({
                where: { id: todo.id }, // Use the ID to identify the todo
                data: {
                    favourite: todo.favourite,
                    done: todo.done
                },
            });
        }

        return {
            ok: true,
            message: 'Todos updated successfully'
        };
    } catch (error) {
        console.error('Failed to update todos:', error);
        return {
            ok: false,
            message: 'Failed to update todos'
        };
    }
};