'use server';

import { auth } from "@/auth.config";
import { Todo } from "@/interfaces";
import prisma from "@/lib/prisma";

export const createOrUpdateTodosBySubTask = async (todos: Todo[], subTaskId: string | undefined) => {
    if (!todos) {
        console.error('Todos array is undefined');
        return 'Todos array is undefined';
    }

    console.log('Creating or updating Todos...');

    const session = await auth();
    const userId = session?.user.id;

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

        // Iterate through received todos to create or update them
        for (const todoData of todos) {
            const existingTodo = subtask.todos.find(todo => todo.id === todoData.id);

            if (existingTodo) {
                // Update existing todo
                await prisma.todo.update({
                    where: { id: existingTodo.id },
                    data: {
                        description: todoData.description,
                        date: todoData.date,
                        done: todoData.done || false,
                        favourite: todoData.favourite || false
                    }
                });
            } else {
                // Create new todo
                await prisma.todo.create({
                    data: {
                        description: todoData.description,
                        date: todoData.date,
                        done: todoData.done || false,
                        favourite: todoData.favourite || false,
                        subTaskId: subTaskId || ''
                    }
                });
            }
        }

        console.log('Todos created or updated successfully');
        return 'Todos created or updated successfully';
    } catch (error) {
        // Handle errors
        console.error('Error creating or updating subtask todos:', error);
        return 'Failed to create or update todos';
    }
};