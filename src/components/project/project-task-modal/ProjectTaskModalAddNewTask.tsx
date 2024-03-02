'use client'

import { createTask } from "@/actions";
import { TaskPriority, TaskStatus } from "@/interfaces";
import { useProjectStore } from "@/store";
import clsx from "clsx";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Datepicker from "react-tailwindcss-datepicker";
import { FaSave } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';

type FormInputs = {
    name: string;
    location: string;
    incidence: string;
    contractor: string;
    start: string;
    end: string;
    priority: TaskPriority;
    status: TaskStatus;
    description: string
}

export const ProjectTaskModalAddNewTask = () => {

    const closeTaskModal = useProjectStore(state => state.closeTaskModal)
    const activeProject = useProjectStore(state => state.activeProject)

    const [errorMessage, setErrorMessage] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>()

    const [value, setValue] = useState({
        startDate: '',
        endDate: ''
    });

    const handleValueChange = (newValue: any) => {
        setValue(newValue);
    }


    const onSubmit: SubmitHandler<FormInputs> = async (data) => {

        setErrorMessage('')

        const resp = await createTask({
            name: data.name,
            location: data.location,
            description: data.description,
            incidence: '0',
            contractor: data.contractor,
            progress: '0',
            start: value.startDate,
            end: value.endDate,
            priority: data.priority,
            status: data.status,
            subTasks: [],
            projectId: activeProject ? activeProject.id : '',
        })

        if (!resp.ok) {
            setErrorMessage('Cannot create task')
            return
        }
        // onClose()
        // todo
        window.location.replace(`/project/${activeProject?.id}/task`)
    }

    return (

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
            <div className="flex items-center justify-between py-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-normal text-gray-900">
                    New <span className="font-extrabold">Task</span>
                </h3>
                <div className="flex">
                    <div className="flex justify-end space-x-1">
                        <button
                            type="submit"
                            className={`bg-transparent rounded-lg text-lg w-6 h-6 inline-flex justify-center items-center text-sky-700`}
                        >
                            <FaSave />
                            <span className="sr-only">Save</span>
                        </button>
                        <button
                            type="button"
                            className="text-red-700 bg-transparent rounded-lg text-lg w-6 h-6 inline-flex justify-center items-center"
                            data-modal-toggle="crud-modal"
                            onClick={closeTaskModal}
                        >
                            <FaX />
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid gap-4 mb-4 grid-cols-2 "></div>

            <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Task Name</label>
                <input
                    type="name"
                    id="name"
                    placeholder="Task 01"
                    className={
                        clsx(
                            "bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full h-10 p-2.5",
                            {
                                'focus:outline-none focus:border-2 border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500': !!errors.name
                            }
                        )
                    }
                    {...register('name', {
                        required: true,
                    })
                    }
                />
            </div>

            <div>
                <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900">Location</label>
                <input
                    type="location"
                    id="location"
                    placeholder="Kitchen, bedroom ..."
                    className={
                        clsx(
                            "bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full h-10 p-2.5",
                            {
                                'focus:outline-none focus:border-2 border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500': !!errors.name
                            }
                        )
                    }
                    {...register('location', {
                        required: true,
                    })
                    }
                />
            </div>

            <div>
                <label htmlFor="contractor" className="block mb-2 text-sm font-medium text-gray-900">contractor</label>
                <input
                    type="contractor"
                    id="contractor"
                    placeholder="Contractor name"
                    className={
                        clsx(
                            "bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full h-10 p-2.5",
                            {
                                'focus:outline-none focus:border-2 border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500': !!errors.name
                            }
                        )
                    }
                    {...register('contractor', {
                        required: true,
                    })
                    }
                />
            </div>

            <div>

                <label htmlFor="start-end" className="block mb-2 text-sm font-medium text-gray-900">Start and End date</label>
                <div className="relative">
                    <Datepicker
                        useRange={false}
                        inputClassName="bg-gray-50 border text-gray-900 sm:text-sm rounded-lg  w-full h-10 p-2.5"
                        placeholder={"Select Dates"}
                        value={value}
                        onChange={handleValueChange}
                    />
                </div>

            </div>

            <div>
                <label htmlFor="priority" className="block mb-2 text-sm font-medium text-gray-900">Priority</label>
                <select
                    id="priority"
                    className={
                        clsx(
                            "bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full h-10 p-2.5",
                            {
                                'focus:outline-none focus:border-2 border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500': !!errors.name
                            }
                        )
                    }
                    {...register('priority', {
                        required: true,
                    })
                    }
                >
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                </select>
            </div>

            <div>
                <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">Status</label>
                <select
                    id="status"
                    className={
                        clsx(
                            "bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full h-10 p-2.5",
                            {
                                'focus:outline-none focus:border-2 border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500': !!errors.name
                            }
                        )
                    }
                    {...register('status', {
                        required: true,
                    })
                    }
                >
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="finished">Finished</option>
                </select>
            </div>

            <div>
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Project description</label>
                <textarea
                    rows={3}
                    id="description"
                    placeholder="Description..."
                    className="bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block p-2.5 w-full text-sm "
                    {...register('description')}
                ></textarea>
            </div>
        </form>

    );
};