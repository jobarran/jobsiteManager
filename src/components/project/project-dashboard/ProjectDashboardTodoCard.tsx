'use client'

import { Task, Todo } from '@/interfaces';
import { useProjectStore } from '@/store';
import { capitalizeFirstLetter, handleDateStatusBgColor, handleDateStatusText, handleDateStatusTextColor } from '@/utils';
import { useEffect, useState } from 'react';
import { FaRegSquare, FaRegStar, FaSquareCheck, FaStar, FaTrash } from 'react-icons/fa6';

interface Props {
    tasks: Task[] | undefined
}

interface ExtendedTodo extends Todo {
    subTaskName: string;
    taskName: string
}

export const ProjectDashboardTodoCard = ({ tasks }: Props) => {

    const activeProjectTasks = useProjectStore(state => state.activeProjectTasks)
    const setProjectTasks = useProjectStore(state => state.setProjectTasks)

    useEffect(() => {
        if (!activeProjectTasks) {
            setProjectTasks(tasks ? tasks : [])
            console.log('fetching tasks')
        }
    }, [])

    const findTaskNameById = (taskId: string, tasks: Task[]): string => {
        const foundTask = tasks.find(task => task.id === taskId);
        return foundTask ? foundTask.name : ""
    }

    const getAllTodos = (activeProjectTasks: Task[] | null): ExtendedTodo[] => {
        let allTodos: ExtendedTodo[] = [];
    
        if (!activeProjectTasks) {
            return allTodos; 
        }
    
        activeProjectTasks.forEach(task => {
            task.subTasks.forEach(subTask => {
                if (subTask.todos) {
                    subTask.todos.forEach(todo => {
                        const taskName = findTaskNameById(subTask.taskId, activeProjectTasks);
                        const todoWithSubtaskName: ExtendedTodo = {
                            ...todo,
                            subTaskName: subTask.name,
                            taskName: taskName
                        };
                        allTodos.push(todoWithSubtaskName);
                    });
                }
            });
        });
    
        return allTodos;
    }


    const allTodos = getAllTodos(activeProjectTasks ? activeProjectTasks : [])

    console.log(allTodos)

    return (

        <div className="w-full p-4  border border-gray-100 bg-white rounded-lg sm:p-8">
            <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Todo list</h5>

            <div className="w-full text-sm text-gray-500">
                {allTodos.map((item: ExtendedTodo, index: number) => (
                    <div key={index} className="flex items-center justify-between pt-4">
                        <div className="flex items-center space-x-2">
                            <button className={`pr-1 py-1 ${item.done ? 'text-lime-600' : 'text-gray-500'}`} onClick={() => { }}>
                                {item.done ? <FaSquareCheck /> : <FaRegSquare />}
                            </button>
                            <p className="flex-shrink">
                                <span className="text-gray-400">{`${capitalizeFirstLetter(item.taskName)} / ${capitalizeFirstLetter(item.subTaskName)}`}</span> - {capitalizeFirstLetter(item.description)}
                            </p>
                            <span className={`${handleDateStatusTextColor(item)} ${handleDateStatusBgColor(item)} text-xs font-medium px-2.5 py-0.5 rounded`}>
                                {handleDateStatusText(item)}
                            </span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <button className="px-1 py-1 text-yellow-400" onClick={() => { }}>
                                {item.favourite ? <FaStar /> : <FaRegStar />}
                            </button>
                            <button className="px-1 py-1 text-red-500" onClick={() => { }}>
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>


    )
}



