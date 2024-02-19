'use client'

import { Task, Todo } from '@/interfaces';
import { useProjectStore } from '@/store';
import { handleDateStatusBgColor, handleDateStatusText, handleDateStatusTextColor } from '@/utils';
import { useEffect, useState } from 'react';
import { FaRegSquare, FaRegStar, FaSquareCheck, FaStar, FaTrash } from 'react-icons/fa6';

interface Props {
    tasks: Task[] | undefined
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

    function getAllTodos(tasks: Task[]) {
        
        let allTodos: Todo[] = [];
    
        tasks.forEach(task => {
            task.subTasks.forEach(subTask => {
                if (subTask.todos) { 
                    allTodos = allTodos.concat(subTask.todos);
                }            });
        });
    
        allTodos.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            
            if (dateA < dateB) {
                return -1;
            }
            if (dateA > dateB) {
                return 1;
            }
            return 0;
        });
    
        return allTodos;
    }


    const allTodos = getAllTodos(activeProjectTasks ? activeProjectTasks : [])

    return (

        <div className="w-full p-4  border border-gray-100 bg-white rounded-lg sm:p-8">
            <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Todo list</h5>

            <div className="w-full text-sm text-gray-500">
                {allTodos.map((item: Todo, index: number) => (
                    <div key={index} className="flex items-center justify-between pt-4">
                        <div className="flex items-center space-x-2">
                            <button className={`pr-1 py-1 ${item.done ? 'text-lime-600' : 'text-gray-500'}`} onClick={() => { }}>
                                {item.done ? <FaSquareCheck /> : <FaRegSquare />}
                            </button>
                            <p className="flex-shrink">{item.description}</p>
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



