'use client'

import { Todo } from "@/interfaces";
import { useProjectStore } from "@/store";
import { useEffect, useState } from "react";
import { FaCheck, FaCheckSquare } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { FaRegSquare } from "react-icons/fa";
import { FaRegCheckSquare } from "react-icons/fa";
import Datepicker from "react-tailwindcss-datepicker";
import { capitalizeFirstLetter, handleDateStatusBgColor, handleDateStatusText, handleDateStatusTextColor } from "@/utils";
import { FaSquareCheck } from "react-icons/fa6";
import { deleteTodoById } from "@/actions";

interface Props {
    todos: Todo[],
    setTodos: (data: Todo[]) => void,
    modifiedTodos: Todo[]
    setModifiedTodos: (data: Todo[]) => void,
    deletedTodos: string[]
    setDeletedTodos: (data: string[]) => void,
}

export const ProjectSubTaskToDo = ({ todos = [], setTodos, modifiedTodos, setModifiedTodos, deletedTodos, setDeletedTodos }: Props) => {

    const activeSubTaskId = useProjectStore(state => state.activeSubTaskId)
    const isSubTaskModalOpen = useProjectStore(state => state.isSubTaskModalOpen)
    const setSubTaskModalEditableTrue = useProjectStore(state => state.setSubTaskModalEditableTrue)


    const [date, setDate] = useState({
        startDate: null,
        endDate: null
    })
    const [description, setDescription] = useState('')

    useEffect(() => {
        setDate({
            startDate: null,
            endDate: null
        })
        setDescription('')
    }, [isSubTaskModalOpen])    


    const handleDateChange = (newDate: any) => {
        setDate(newDate);
    }

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }

    const handleAddTodo = () => {
        if (date.startDate && activeSubTaskId) {
            const newTodo = {
                description: description,
                date: date.startDate,
                done: false,
                favourite: false,
                subTaskId: activeSubTaskId
            };
            setTodos([...todos, newTodo]);
            setModifiedTodos([...modifiedTodos, newTodo])
            setSubTaskModalEditableTrue()
            setDate({
                startDate: null,
                endDate: null
            })
            setDescription('')
        }
    }

    const handleDeleteTodo = (index: number, todo: Todo) => {
        const updatedTodos = [...todos];
        updatedTodos.splice(index, 1);
        setTodos(updatedTodos);
        setSubTaskModalEditableTrue()
        if (todo.id)
            setDeletedTodos([...deletedTodos, todo.id])
    };

    const toggleTodoDone = (item: Todo) => {
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
                setModifiedTodos([...modifiedTodos, { ...item, done: !item.done }]);
            }

            setSubTaskModalEditableTrue();
        }
    };


    const toggleFav = (item: Todo) => {
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
                setModifiedTodos([...modifiedTodos, { ...item, favourite: !item.favourite }]);
            }

            setSubTaskModalEditableTrue();
        }
    };

    return (
        <div className='pt-6'>
            <h3 className="text-sm font-semibold text-gray-800">Todo list</h3>

            <div className="flex items-center pt-4 pb-2">
                <div className="flex w-full">
                    <input
                        type="description"
                        id="description"
                        maxLength={40}
                        placeholder="Add Todo"
                        value={description}
                        onChange={(e) => handleDescriptionChange(e)}
                        className="bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full h-8 p-2"
                    />
                </div>

                <div className='flex w-48 ml-2'>
                    <div className="relative">
                        <Datepicker
                            minDate={new Date()}
                            asSingle={true}
                            useRange={false}
                            inputClassName="bg-gray-50 border text-gray-900 sm:text-sm rounded-lg w-full h-8 p-2"
                            placeholder={"Date"}
                            value={date}
                            onChange={handleDateChange}
                        />
                    </div>
                </div>

                <button onClick={handleAddTodo} className="ml-4">Add</button>
            </div>

            <div className="w-full text-sm text-gray-500">
                {todos?.map((item: Todo, index: number) => (
                    <div key={index} className="flex items-center justify-between pt-4">
                        <div className="flex items-center space-x-2">
                            <button className={`pr-1 py-1 ${item.done ? 'text-lime-600' : 'text-gray-500'}`} onClick={() => toggleTodoDone(item)}>
                                {item.done ? <FaSquareCheck /> : <FaRegSquare />}
                            </button>
                            <p className="flex-shrink">
                                <span className={`text-gray-800 font-medium ${item.done ? 'strikethrough' : ''}`}>{capitalizeFirstLetter(item.description)}  </span>
                                <span className={`${handleDateStatusTextColor(item)} ${handleDateStatusBgColor(item)} text-xs font-medium px-2.5 py-0.5 rounded`} style={{ whiteSpace: 'nowrap' }}>
                                    {handleDateStatusText(item)}
                                </span>
                            </p>
                        </div>
                        <div className="flex items-center space-x-1">
                            <button className="px-1 py-1 text-yellow-400" onClick={() => toggleFav(item)}>
                                {item.favourite ? <FaStar /> : <FaRegStar />}
                            </button>
                            <button className="px-1 py-1 text-red-500" onClick={() => handleDeleteTodo(index, item)}>
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};