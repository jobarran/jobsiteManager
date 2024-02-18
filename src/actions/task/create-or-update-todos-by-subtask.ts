'use server';

import { auth } from "@/auth.config";
import { Todo } from "@/interfaces";
import prisma from "@/lib/prisma";

export const createOrUpdateTodosBySubTask = async (todos:Todo[], subTaskId:string | undefined) => {

    if (!todos) {
        console.error('Todos array is undefined');
        return 'Todos array is undefined';
    }
    
    console.log('updating Todos...')
    
    const session = await auth();
    const userId = session?.user.id

    if (!userId) {
        return {
            ok: false,
            message: 'There is no user logged',
        };
    }

    try {
        // Find the subtask by its ID including associated todos
        const subtask = await prisma.subTask.findUnique({
            where: {
                id: subTaskId
            },
            include: {
                todos: true
            }
        });

        if (!subtask) {
            // Handle case where subtask with given ID is not found
            throw new Error('Subtask not found');
        }

        // Create new Todo objects based on the received todos data
        const newTodos = todos.map(todoData => ({
            description: todoData.description,
            date: todoData.date,
            done: todoData.done || false,
            favourite: todoData.favourite || false,
            subTaskId: subTaskId || ''
        }));

        // Replace existing todos with the new todos received in props
        await prisma.todo.deleteMany({
            where: {
                subTaskId: subTaskId
            }
        });

        await prisma.todo.createMany({
            data: newTodos
        });
        console.log('Todos updated successfully')
        return 'Todos updated successfully';
    } catch (error) {
        // Handle errors
        console.error('Error updating subtask todos:', error);
        return 'Failed to update todos';
    }
}