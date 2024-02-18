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
import { handleDateStatusBgColor, handleDateStatusText, handleDateStatusTextColor } from "@/utils";
import { FaSquareCheck } from "react-icons/fa6";

interface Props {
    todos: Todo[],
    setTodos: (data: Todo[]) => void
}

export const ProjectSubTaskToDo = ({ todos = [], setTodos }: Props) => {

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
            setSubTaskModalEditableTrue()
            setDate({
                startDate: null,
                endDate: null
            })
            setDescription('')
        }
    }

    const handleDeleteTodo = (index: number) => {
        const updatedTodos = [...todos];
        updatedTodos.splice(index, 1); 
        setTodos(updatedTodos);
        setSubTaskModalEditableTrue()
    };

    const toggleTodoDone = (index: number) => {
        const updatedTodos = [...todos];
        updatedTodos[index].done = !updatedTodos[index].done;
        setTodos(updatedTodos);
        setSubTaskModalEditableTrue()
    }

    const toggleFav = (index: number) => {
        const updatedTodos = [...todos];
        updatedTodos[index].favourite = !updatedTodos[index].favourite;
        setTodos(updatedTodos);
        setSubTaskModalEditableTrue()
    }

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
                            <button className={`pr-1 py-1 ${item.done ? 'text-lime-600' : 'text-gray-500'}`} onClick={() => toggleTodoDone(index)}>
                                {item.done ? <FaSquareCheck /> : <FaRegSquare />}
                            </button>
                            <p className="flex-shrink">{item.description}</p>
                            <span className={`${handleDateStatusTextColor(item)} ${handleDateStatusBgColor(item)} text-xs font-medium px-2.5 py-0.5 rounded`}>
                                {handleDateStatusText(item)}
                            </span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <button className="px-1 py-1 text-yellow-400" onClick={() => toggleFav(index)}>
                                {item.favourite ? <FaStar /> : <FaRegStar />}
                            </button>
                            <button className="px-1 py-1 text-red-500" onClick={() => handleDeleteTodo(index)}>
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};