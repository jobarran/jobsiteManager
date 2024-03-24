'use client'

import { Task, Todo } from '@/interfaces';
import { useProjectStore } from '@/store';
import { capitalizeFirstLetter, extractTodos, getAllTodos, handleDateStatusBgColor, handleDateStatusText, handleDateStatusTextColor } from '@/utils';
import { useEffect, useMemo, useState } from 'react';
import { FaRegSquare, FaRegStar, FaSquareCheck, FaStar, FaTrash } from 'react-icons/fa6';
import { FaSave } from 'react-icons/fa';
import { updateTodos } from '@/actions';
import { TodoSkeleton } from '@/components';

interface Props {
    tasks: Task[] | undefined
}

interface ExtendedTodo extends Todo {
    subTaskName: string;
    taskName: string
}

export const ProjectDashboardTodoCard = ({ tasks }: Props) => {
    const setProjectTasks = useProjectStore(state => state.setProjectTasks);
    const activeProjectTasks = useProjectStore(state => state.activeProjectTasks);

    const [todos, setTodos] = useState<ExtendedTodo[]>();
    const [modifiedTodos, setModifiedTodos] = useState<ExtendedTodo[]>([])
    const [validForSave, setValidForSave] = useState(false)
    const [loading, setLoading] = useState(true); // Added loading state


    useEffect(() => {
        if (!activeProjectTasks) {
            setProjectTasks(tasks ? tasks : []);
            console.log('fetching tasks');
            const allTodos = extractTodos(tasks ? tasks : []);
            setTodos(allTodos)
            console.log('fetching todos from action')
            setLoading(false); // Set loading to false after todos are fetched

        } else {
            const allTodos = extractTodos(activeProjectTasks);
            setTodos(allTodos)
            console.log('fetching todos store')
            setLoading(false); // Set loading to false after todos are fetched

        }
    }, []);

    useEffect(() => {
        console.log(modifiedTodos)
    }, [modifiedTodos])


    const handleSaveTodo = async () => {
        if (validForSave && todos) {
            setLoading(true);
            try {
                await updateTodos(modifiedTodos);

                const updatedTodos = [...todos];

                modifiedTodos.forEach(modifiedTodo => {
                    const index = updatedTodos.findIndex(todo => todo.id === modifiedTodo.id);
                    if (index !== -1) {
                        updatedTodos[index] = modifiedTodo;
                    }
                });

                const filteredTodos = updatedTodos.filter(todo => !todo.done && todo.favourite);

                setTodos(filteredTodos);
                setModifiedTodos([]);
                setValidForSave(false);
            } catch (error) {
                console.error('Failed to save todos:', error);
                // Handle error
            } finally {
                setLoading(false);
            }
        }
    };

    const toggleTodoDone = (item: ExtendedTodo) => {
        if (todos) {
            const updatedTodos = todos.map(todo =>
                todo.id === item.id ? { ...todo, done: !todo.done } : todo
            );
            setTodos(updatedTodos);
            const existingModifiedTodoIndex = modifiedTodos.findIndex(todo => todo.id === item.id);
            if (existingModifiedTodoIndex !== -1) {
                const updatedModifiedTodos = [...modifiedTodos];
                updatedModifiedTodos[existingModifiedTodoIndex] = { ...item, done: !item.done };
                setModifiedTodos(updatedModifiedTodos);
            } else {
                setModifiedTodos(prevModifiedTodos => [...prevModifiedTodos, { ...item, done: !item.done }]);
            }
            setValidForSave(true);
        }
    };

    const toggleFav = (item: ExtendedTodo) => {
        if (todos) {
            const updatedTodos = todos.map(todo =>
                todo.id === item.id ? { ...todo, favourite: !todo.favourite } : todo
            );
            setTodos(updatedTodos);
            const existingModifiedTodoIndex = modifiedTodos.findIndex(todo => todo.id === item.id);
            if (existingModifiedTodoIndex !== -1) {
                const updatedModifiedTodos = [...modifiedTodos];
                updatedModifiedTodos[existingModifiedTodoIndex] = { ...item, favourite: !item.favourite };
                setModifiedTodos(updatedModifiedTodos);
            } else {
                setModifiedTodos(prevModifiedTodos => [...prevModifiedTodos, { ...item, favourite: !item.favourite }]);
            }
            setValidForSave(true);
        }
    };

    return (
        <div className="w-full p-4  border border-gray-100 bg-white rounded-lg sm:p-8">
            <div className='flex items-center justify-between mb-2'>
                <div className='flex items-center'>
                    <FaRegStar />
                    <h5 className="ml-2 text-xl font-medium text-gray-500 dark:text-gray-400">Todo</h5>
                </div>
                <button
                    type="button"
                    className={`bg-transparent rounded-lg text-lg w-6 h-6 inline-flex justify-center items-center ${validForSave ? 'text-sky-700' : 'text-gray-400'}`}
                    data-modal-toggle="crud-modal"
                    onClick={handleSaveTodo}
                    disabled={!validForSave}
                >
                    <FaSave />
                    <span className="sr-only">Save</span>
                </button>            </div>
            <div className="w-full text-sm text-gray-500">


                {loading && TodoSkeleton}
                {!loading && todos?.map((item: ExtendedTodo, index: number) => (
                    <div key={index} className="flex items-center justify-between pt-4">
                        <div className="flex items-center space-x-2">
                            <button
                                className="text-yellow-400"
                                onClick={() => toggleFav(item)}>
                                {item.favourite ? <FaStar /> : <FaRegStar />}
                            </button>
                            <button
                                className={`px-1 py-1 ${item.done ? 'text-lime-600' : 'text-gray-500'}`}
                                onClick={() => toggleTodoDone(item)}
                            >
                                {item.done ? <FaSquareCheck /> : <FaRegSquare />}
                            </button>
                            <p className="flex-shrink">
                                <span className={`text-gray-400 ${item.done ? 'strikethrough' : ''}`}>
                                    {`${capitalizeFirstLetter(item.taskName)} / ${capitalizeFirstLetter(item.subTaskName)}`}
                                </span>
                                <span className={`text-gray-800 font-medium ${item.done ? 'strikethrough' : ''}`}>
                                    - {capitalizeFirstLetter(item.description)}
                                </span>
                                <span className={`${handleDateStatusTextColor(item)} ${handleDateStatusBgColor(item)} text-xs font-medium px-2.5 py-0.5 rounded`} style={{ whiteSpace: 'nowrap' }}>
                                    {handleDateStatusText(item)}
                                </span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};