'use client'

import { Todo } from "@/interfaces";
import { useProjectStore } from "@/store";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { FaRegSquare } from "react-icons/fa";
import { FaRegCheckSquare } from "react-icons/fa";
import Datepicker from "react-tailwindcss-datepicker";


const TodoExample: Todo[] = [
    {
        description: 'First Todo example',
        date: '2024-02-17',
        done: true,
        favourite: false
    },
    {
        description: 'Second Todo example',
        date: '2024-02-19',
        done: false,
        favourite: false
    },
    {
        description: 'Third Todo example',
        date: '2024-02-28',
        done: false,
        favourite: false
    }
];



export const ProjectSubTaskToDo = () => {

    const setSubTaskModalEditableTrue = useProjectStore(state => state.setSubTaskModalEditableTrue)

    const [date, setDate] = useState(null)

    const handleDateChange = (newDate: any) => {
        setDate(newDate);
    }

    const handleDateStatus = (date: string) => {
        const currentDate = new Date();
        const givenDate = new Date(date);

        // Set hours, minutes, seconds, and milliseconds to 0 for both dates to compare only dates
        currentDate.setHours(0, 0, 0, 0);
        givenDate.setHours(0, 0, 0, 0);

        // Calculate the start and end dates of the current week
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Start of current week (Sunday)
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6); // End of current week (Saturday)

        // Calculate the start date of the next week
        const startOfNextWeek = new Date(startOfWeek);
        startOfNextWeek.setDate(startOfNextWeek.getDate() + 7);

        if (givenDate.getTime() === currentDate.getTime()) {
            return "today";
        } else if (givenDate >= startOfWeek && givenDate <= endOfWeek) {
            return "this-week";
        } else if (givenDate >= startOfNextWeek && givenDate <= new Date(endOfWeek.getTime() + 7 * 24 * 60 * 60 * 1000)) {
            return "next-week";
        } else {
            return "other";
        }
    }

    const handleDateStatusTextColor = (Todo: Todo) => {
        if (Todo) {
            const dateStatus = handleDateStatus(Todo.date)
            switch (dateStatus) {
                case 'today':
                    return 'text-lime-600'
                case 'this-week':
                    return 'text-lime-600'
                case 'next-week':
                    return 'text-amber-600'
                default:
                    break;
            }
        }
    }

    const handleDateStatusBgColor = (Todo: Todo) => {
        if (Todo) {
            const dateStatus = handleDateStatus(Todo.date)

            switch (dateStatus) {
                case 'today':
                    return 'bg-lime-200'
                case 'this-week':
                    return 'bg-lime-200'
                case 'next-week':
                    return 'bg-amber-200'
                default:
            }
        }
    }

    const handleDateStatusText = (Todo: Todo) => {
        if (Todo) {
            const dateStatus = handleDateStatus(Todo.date)

            switch (dateStatus) {
                case 'today':
                    return 'Today'
                case 'this-week':
                    return 'This week'
                case 'next-week':
                    return 'Next week'
                default:
            }
        }
    }

    return (
        <div className='pt-6'>
            <h3 className="text-sm font-semibold text-gray-800">Todo list</h3>

            <div className="flex items-center pt-4 pb-2">
                <div style={{ flex: '1', marginRight: '10px' }}>
                    <input
                        type="description"
                        id="description"
                        maxLength={40} 
                        placeholder="Add Todo"
                        className="bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full h-8 p-2"
                    />
                </div>

                <div style={{ flex: '0 0 120px', marginRight: '10px' }}>
                    <div className="relative">
                        <Datepicker
                            asSingle={true}
                            useRange={false}
                            inputClassName="bg-gray-50 border text-gray-900 sm:text-sm rounded-lg w-full h-8 p-2"
                            placeholder={"Select Dates"}
                            value={date}
                            onChange={handleDateChange}
                        />
                    </div>
                </div>

                <button style={{ marginLeft: '10px' }}>Add</button>
            </div>

            <div className="w-full text-sm text-gray-500">
                {TodoExample?.map((item: Todo, index: number) => (
                    <div key={index} className="flex items-center justify-between pt-4">
                        <div className="flex items-center space-x-2">
                            <button className="pr-1 py-1 text-gray-500">
                                <FaRegSquare />
                            </button>
                            <p className="flex-shrink">{item.description}</p>
                            <span className={`${handleDateStatusTextColor(item)} ${handleDateStatusBgColor(item)} text-xs font-medium px-2.5 py-0.5 rounded`}>
                                {handleDateStatusText(item)}
                            </span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <button className="px-1 py-1 text-yellow-500">
                                <FaRegStar />
                            </button>
                            <button className="px-1 py-1 text-red-500">
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};